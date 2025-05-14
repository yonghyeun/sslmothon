import { useEffect, useState } from "react";
import "./App.css";
import { calculateZCoordinate } from "./lib";
import { TruncatedCone } from "./ui";

interface AppProps {
  radiusLeft: number;
  radiusRight: number;
  height: number;
}

const App: React.FC<AppProps> = ({ ...args }) => {
  const [z, setZ] = useState(Math.floor(Math.random() * (args.height - 0) + 0)); // 사용자가 조정한 무게중심 위치
  const [status, setStatus] = useState<
    "ready" | "playing" | "success" | "failure"
  >("ready");
  const [time, setTime] = useState(0);
  const [attempts, setAttempts] = useState(0); // 시도 횟수 추가

  // 실제 무게중심 위치 계산
  const answer = Math.floor(
    calculateZCoordinate(args.radiusLeft, args.radiusRight, args.height)
  );

  const isCorrect = z === answer; // 정답 여부

  // 게임 시작 시 타이머 시작
  useEffect(() => {
    let interval: number | undefined;

    if (status === "playing") {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  // 정답 확인 핸들러
  const handleCheckAnswer = () => {
    setAttempts((prev) => prev + 1);
    if (isCorrect) {
      setStatus("success");
    } else {
      setStatus("failure");
    }
  };

  // 게임 재시작 핸들러
  const handleRestart = () => {
    setStatus("ready");
    setTime(0);
    setZ(Math.floor(args.height / 8));
  };

  return (
    <main>
      <div className="game-container">
        <h1>원뿔대 무게중심 찾기</h1>
        <p className="instruction">
          {status === "ready" && "원뿔대의 무게중심 위치를 찾아보세요."}
          {status === "playing" && "무게중심을 찾아 균형을 맞추세요!"}
          {status === "success" &&
            "축하합니다! 무게중심을 정확히 찾았습니다! 👍"}
          {status === "failure" &&
            "아쉽습니다! 무게중심 위치가 정확하지 않습니다. 다시 시도해보세요."}
        </p>

        <div className="truncated-cone-container">
          <TruncatedCone
            {...args}
            z={z}
            style={{
              transform:
                status === "success"
                  ? "none"
                  : `rotateZ(${(answer - z) / 5}deg)`,
              transition: "transform 1s",
            }}
          />
        </div>

        <div className="controls">
          {status === "ready" && (
            <button
              className="start-button"
              onClick={() => {
                setStatus("playing");
              }}
            >
              무게중심 찾기 시작하기
            </button>
          )}

          {status === "playing" && (
            <>
              <div className="controls-info">
                <div>
                  경과 시간: <strong>{time}초</strong>
                </div>
              </div>

              <div className="button-wrapper">
                <input
                  type="range"
                  min={0}
                  max={args.height}
                  onChange={({ target }) => {
                    setZ(Number(target.value));
                  }}
                />

                <button className="check-button" onClick={handleCheckAnswer}>
                  무게중심 위치 확인하기
                </button>
              </div>
            </>
          )}

          {(status === "success" || status === "failure") && (
            <div className="result-container">
              <div className="result-info">
                <p>
                  {status === "success"
                    ? `정답입니다! 원뿔대의 정확한 무게중심 위치는 ${answer}px 입니다. 당신의 선택은 ${z}px 입니다.`
                    : `틀렸습니다. 원뿔대의 정확한 무게중심 위치는 ${answer}px 이고, 당신의 선택은 ${z}px 입니다.`}
                </p>
                <p>
                  소요시간: {time}초 / 시도횟수: {attempts}회
                </p>
              </div>
              <button className="restart-button" onClick={handleRestart}>
                다시 시작하기
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;

