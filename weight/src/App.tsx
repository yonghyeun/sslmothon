import { useEffect, useState } from "react";
import "./App.css";
import { calculateZCoordinate } from "./lib";
import { TruncatedCone } from "./ui";

interface AppProps {
  radiusLeft: number;
  radiusRight: number;
  height: number;
}

// 기본 props 값 설정
const defaultProps: AppProps = {
  radiusLeft: 50,
  radiusRight: 100,
  height: 500,
};

const App = (props: AppProps) => {
  const actualArgs = { ...defaultProps, ...props };

  const [z, setZ] = useState(Math.floor(actualArgs.height / 4)); // 시작 위치 수정
  const [status, setStatus] = useState<
    "ready" | "playing" | "success" | "failure"
  >("ready");
  const [time, setTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false); // 정답 표시 여부
  const [visitors, setVisitors] = useState(
    Math.floor(Math.random() * 9000) + 1000
  ); // 가짜 방문자 수

  // 실제 무게중심 위치 계산
  const answer = Math.floor(
    calculateZCoordinate(
      actualArgs.radiusLeft,
      actualArgs.radiusRight,
      actualArgs.height
    )
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
    setZ(Math.floor(actualArgs.height / 4));
    setShowAnswer(false);
    // 방문자 수 증가 (랜덤하게)
    setVisitors((prev) => prev + Math.floor(Math.random() * 5) + 1);
  };

  return (
    <main>
      <div className="game-container">
        <table width="100%" border={1} cellPadding={2} cellSpacing={0}>
          <tbody>
            <tr>
              <td className="text-center">
                <h1>**::♠♥ 원뿔대 무게중심 찾기 게임 ♦♣::**</h1>

                {/* HTML5에서 지원되지 않는 marquee 태그를 div로 대체 */}
                <div className="marquee">
                  <div className="marquee-content">
                    ★☆★ 무게중심을 찾아라! ★☆★
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    margin: "5px",
                    border: "1px solid blue",
                    backgroundColor: "#CCFFFF",
                    padding: "3px",
                  }}
                >
                  <span className="blinking green-text">
                    ★★★ 방문자 수: {visitors} 명 ★★★
                  </span>{" "}
                  |
                  <span className="blue-text">
                    {" "}
                    제작:{" "}
                    <a
                      href="https://www.youtube.com/@hoony_han"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      김철수의 물리학 페이지
                    </a>
                  </span>
                </div>

                <div className="instruction">
                  {status === "ready" && (
                    <span>
                      <span className="red-text">●●●</span>{" "}
                      <strong>원뿔대의 무게중심 위치를 찾아보세요!</strong>{" "}
                      <span className="red-text">●●●</span>
                    </span>
                  )}
                  {status === "playing" && (
                    <span>
                      <span className="green-text">♣♣♣</span>{" "}
                      <strong>슬라이더를 움직여서 무게중심을 찾으세요!</strong>{" "}
                      <span className="green-text">♣♣♣</span>
                    </span>
                  )}
                  {status === "success" && (
                    <span>
                      <span className="blue-text">★★★</span>{" "}
                      <strong>대단해요! 무게중심을 정확히 찾았습니다!</strong>{" "}
                      <span className="blue-text">★★★</span>
                    </span>
                  )}
                  {status === "failure" && (
                    <span>
                      <span className="purple-text">◆◆◆</span>{" "}
                      <strong>
                        아쉽습니다! 무게중심 위치가 정확하지 않습니다. 다시
                        시도해보세요.
                      </strong>{" "}
                      <span className="purple-text">◆◆◆</span>
                    </span>
                  )}
                </div>

                <div className="truncated-cone-container">
                  <img
                    src="https://web.archive.org/web/20090830075752/http://geocities.com/Tokyo/1474/line01.gif"
                    width="300"
                    height="10"
                    alt="구분선"
                    className="hr-image"
                  />

                  <TruncatedCone
                    {...actualArgs}
                    z={showAnswer ? answer : z}
                    style={{
                      transform:
                        status === "success"
                          ? "none"
                          : `rotateZ(${(answer - z) / 4}deg)`,
                      transition: "transform 3s",
                    }}
                  />

                  <img
                    src="https://web.archive.org/web/20090830075752/http://geocities.com/Tokyo/1474/line01.gif"
                    width="300"
                    height="10"
                    alt="구분선"
                    className="hr-image"
                  />

                  {/* 초보적인 추가 정보 표시 */}
                  <table width="80%" border={1} cellPadding={3} cellSpacing={0}>
                    <tbody>
                      <tr>
                        <td className="td-pink text-center">
                          <b>
                            현재 L로부터의 거리:{" "}
                            <span className="red-text">{z}px</span>
                          </b>
                        </td>
                      </tr>
                      {showAnswer && (
                        <tr>
                          <td className="td-blue text-center">
                            <b>
                              <span className="red-text big-font">
                                정답은 {answer}px 입니다!
                              </span>
                            </b>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="controls">
                  {status === "ready" && (
                    <>
                      <table
                        width="90%"
                        border={1}
                        cellPadding={3}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr>
                            <td className="td-green text-center">
                              <b>
                                <span className="blue-text">
                                  좌우 반지름: L={actualArgs.radiusLeft}px, R=
                                  {actualArgs.radiusRight}px
                                </span>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td className="td-green text-center">
                              <b>
                                <span className="green-text">
                                  길이: {actualArgs.height}px
                                </span>
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <button
                        className="start-button"
                        onClick={() => {
                          setStatus("playing");
                        }}
                      >
                        &gt;&gt; 게임 시작하기 &lt;&lt;
                      </button>
                    </>
                  )}

                  {status === "playing" && (
                    <>
                      <table
                        width="100%"
                        border={1}
                        cellPadding={2}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr>
                            <td width="50%" className="td-yellow text-center">
                              <b>
                                경과 시간:{" "}
                                <span className="red-text">{time}초</span>
                              </b>
                            </td>
                            <td width="50%" className="td-yellow text-center">
                              <b>
                                현재 위치:{" "}
                                <span className="blue-text">{z}px</span>
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="button-wrapper">
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{ fontFamily: "Arial", fontSize: "12px" }}
                          >
                            <b>
                              [<span className="red-text">0</span>]
                            </b>
                            $$$$
                            <b>
                              [
                              <span className="red-text">
                                {actualArgs.height}
                              </span>
                              ]
                            </b>
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={actualArgs.height}
                          value={z}
                          onChange={({ target }) => {
                            setZ(Number(target.value));
                          }}
                          style={{ width: "100%", height: "30px" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            style={{
                              flex: 1,
                              backgroundColor: "#99CCFF",
                              fontWeight: "bold",
                              border: "2px outset #0066CC",
                            }}
                            onClick={() => setShowAnswer(!showAnswer)}
                          >
                            {showAnswer ? "정답 숨기기" : "정답 보기 (힌트)"}
                          </button>
                          <button
                            className="check-button"
                            onClick={handleCheckAnswer}
                          >
                            ☞ 무게중심 위치 확인하기 ☜
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {(status === "success" || status === "failure") && (
                    <div className="result-container">
                      <table
                        width="100%"
                        border={1}
                        cellPadding={3}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr>
                            <td className="td-pink text-center">
                              <b>
                                <span
                                  className="big-font"
                                  style={{
                                    color:
                                      status === "success" ? "green" : "red",
                                  }}
                                >
                                  {status === "success"
                                    ? "★축하합니다★"
                                    : "×실패하셨습니다×"}
                                </span>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-center">
                              원뿔대의 정확한 무게중심 위치는{" "}
                              <b>
                                <span className="blue-text">{answer}px</span>
                              </b>{" "}
                              입니다.
                              <br />
                              당신의 선택은{" "}
                              <b>
                                <span className="green-text">{z}px</span>
                              </b>{" "}
                              입니다.
                            </td>
                          </tr>
                          <tr>
                            <td className="td-gray text-center">
                              <b>
                                소요시간: {time}초 / 시도횟수: {attempts}회
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        className="restart-button"
                        onClick={handleRestart}
                      >
                        ☞☞ 다시 시작하기 ☜☜
                      </button>
                    </div>
                  )}
                </div>

                <div className="divider"></div>
                <div className="footer">
                  최종 업데이트: 2004년 12월 23일 &copy; All Rights Reserved.
                  <br />
                  <span className="red-text">
                    이 페이지는 1024x768 해상도에 최적화되어 있습니다.
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default App;

