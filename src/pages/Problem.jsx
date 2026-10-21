import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
    Play,
    Send,
    CheckCircle2,
    XCircle,
    Clock3,
    Database,
    BookOpen
} from "lucide-react";

import { executeCode, getProblem } from "../api";

export default function Problem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [problem, setProblem] = useState(null);
    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState("");
    const [tab, setTab] = useState("testcase");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProblem(id)
            .then((p) => {
                setProblem(p);
                setCode(p.starter_code?.java || "");
            })
            .catch((e) => {
                setResult({
                    status: "Error",
                    message: e.message
                });
            });
    }, [id]);

    useEffect(() => {
        if (problem) {
            setCode(
                problem.starter_code?.[language] || ""
            );
        }
    }, [language, problem]);

    const run = async (submit) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (!problem) {
            return;
        }

        setLoading(true);
        setTab("result");
        setResult(null);

        try {
            const data = await executeCode({
                problem_id: problem.id,
                language,
                code,
                submit
            });

            setResult(data);

            /*
             * ONLY successful SUBMIT
             * goes to Solution page.
             *
             * Run Code does NOT navigate.
             */
            if (
                submit &&
                data.status === "Accepted"
            ) {
                setTimeout(() => {
                    navigate(
                        `/solution/${problem.id}`,
                        {
                            state: {
                                problem: problem,
                                code: code,
                                language: language,
                                result: data
                            }
                        }
                    );
                }, 450);
            }

        } catch (e) {
            setResult({
                status: "Error",
                message: e.message
            });
        } finally {
            setLoading(false);
        }
    };

    if (!problem) {
        return (
            <div className="loading-screen">
                Loading problem...
            </div>
        );
    }

    return (
        <main className="coding-page">

            {/* =========================
                LEFT SIDE
            ========================= */}

            <section className="problem-description">

                <div className="breadcrumbs">
                    Problems
                    <span>/</span>
                    {problem.title}
                </div>

                <div className="problem-title-row">

                    <div>

                        <h1>
                            {problem.id}. {problem.title}
                        </h1>

                        <span
                            className={`difficulty ${String(
                                problem.difficulty
                            ).toLowerCase()}`}
                        >
                            {problem.difficulty}
                        </span>

                    </div>

                    <div className="accept-rate">
                        Acceptance Rate
                        <br />
                        <b>65%</b>
                    </div>

                </div>


                <div className="description-card glass-panel">

                    <h3>Description</h3>

                    <p>
                        {problem.description}
                    </p>


                    <h3>Examples</h3>

                    {problem.examples?.map(
                        (x, i) => (
                            <div
                                className="example"
                                key={i}
                            >

                                <b>
                                    Example {i + 1}
                                </b>

                                <pre>
                                    {x.input}
                                </pre>

                                <span>
                                    Output
                                </span>

                                <pre>
                                    {x.output}
                                </pre>

                                {x.explanation && (
                                    <small>
                                        {x.explanation}
                                    </small>
                                )}

                            </div>
                        )
                    )}


                    <h3>Constraints</h3>

                    <ul>
                        {problem.constraints?.map(
                            (x, i) => (
                                <li key={i}>
                                    {x}
                                </li>
                            )
                        )}
                    </ul>

                </div>

            </section>


            {/* =========================
                RIGHT SIDE
            ========================= */}

            <section className="editor-column">

                <div className="editor-top">

                    <select
                        value={language}
                        onChange={(e) =>
                            setLanguage(
                                e.target.value
                            )
                        }
                        disabled={loading}
                    >

                        <option value="java">
                            Java
                        </option>

                        <option value="python">
                            Python
                        </option>

                        <option value="cpp">
                            C++
                        </option>

                    </select>


                    {/* RUN */}

                    <button
                        className="run-btn"
                        onClick={() =>
                            run(false)
                        }
                        disabled={loading}
                    >

                        <Play size={15} />

                        {loading
                            ? "Running..."
                            : "Run"}

                    </button>


                    {/* SUBMIT */}

                    <button
                        className="submit-btn"
                        onClick={() =>
                            run(true)
                        }
                        disabled={loading}
                    >

                        <Send size={15} />

                        {loading
                            ? "Checking..."
                            : "Submit"}

                    </button>

                </div>


                {/* =========================
                    MONACO EDITOR
                ========================= */}

                <div className="monaco-wrap">

                    <Editor
                        height="58vh"
                        language={
                            language === "cpp"
                                ? "cpp"
                                : language
                        }
                        theme="vs-dark"
                        value={code}
                        onChange={(v) =>
                            setCode(v || "")
                        }
                        options={{
                            fontSize: 14,
                            minimap: {
                                enabled: false
                            },
                            automaticLayout: true,
                            padding: {
                                top: 16
                            },
                            scrollBeyondLastLine: false
                        }}
                    />

                </div>


                {/* =========================
                    RESULT BOX
                ========================= */}

                <div className="result-box">

                    <div className="result-tabs">

                        <button
                            className={
                                tab === "testcase"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setTab("testcase")
                            }
                        >

                            <BookOpen size={15} />

                            Testcase

                        </button>


                        <button
                            className={
                                tab === "result"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setTab("result")
                            }
                        >
                            Test Result
                        </button>

                    </div>


                    {/* =========================
                        TEST CASES
                    ========================= */}

                    {tab === "testcase" && (

                        <div className="testcase-row">

                            {problem.test_cases?.map(
                                (t, i) => (

                                    <div
                                        className="test-case"
                                        key={i}
                                    >

                                        <b>
                                            Test {i + 1}
                                        </b>

                                        <span>
                                            Input
                                        </span>

                                        <code>
                                            {t.input}
                                        </code>

                                        <span>
                                            Expected
                                        </span>

                                        <code>
                                            {
                                                t.expected_output
                                            }
                                        </code>

                                    </div>

                                )
                            )}

                        </div>

                    )}


                    {/* =========================
                        RESULT
                    ========================= */}

                    {tab === "result" && (

                        <div className="result-content">

                            {!result && (
                                <p>
                                    Run your code to
                                    see the result.
                                </p>
                            )}


                            {result && (
                                <>

                                    <h2
                                        className={
                                            result.status ===
                                            "Accepted"
                                                ? "success-text"
                                                : "error-text"
                                        }
                                    >

                                        {result.status ===
                                        "Accepted" ? (
                                            <CheckCircle2 />
                                        ) : (
                                            <XCircle />
                                        )}

                                        {result.status}

                                    </h2>


                                    {result.message && (
                                        <p>
                                            {
                                                result.message
                                            }
                                        </p>
                                    )}


                                    {result.passed_tests !==
                                        undefined && (

                                        <div className="metrics">

                                            <div>

                                                <CheckCircle2 />

                                                <b>
                                                    {
                                                        result.passed_tests
                                                    }
                                                    /
                                                    {
                                                        result.total_tests
                                                    }
                                                </b>

                                                <span>
                                                    Tests Passed
                                                </span>

                                            </div>


                                            <div>

                                                <Clock3 />

                                                <b>
                                                    {
                                                        result.runtime_ms ??
                                                        "-"
                                                    }{" "}
                                                    ms
                                                </b>

                                                <span>
                                                    Runtime
                                                </span>

                                            </div>


                                            <div>

                                                <Database />

                                                <b>
                                                    {
                                                        result.memory_kb ??
                                                        "-"
                                                    }{" "}
                                                    KB
                                                </b>

                                                <span>
                                                    Memory
                                                </span>

                                            </div>

                                        </div>

                                    )}


                                    {result.error && (

                                        <pre className="error-box">
                                            {result.error}
                                        </pre>

                                    )}


                                    {result.actual_output !==
                                        undefined && (

                                        <div className="io-grid">

                                            <div>

                                                <span>
                                                    Output
                                                </span>

                                                <pre>
                                                    {
                                                        result.actual_output
                                                    }
                                                </pre>

                                            </div>


                                            <div>

                                                <span>
                                                    Expected
                                                </span>

                                                <pre>
                                                    {
                                                        result.expected_output
                                                    }
                                                </pre>

                                            </div>

                                        </div>

                                    )}

                                </>
                            )}

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}