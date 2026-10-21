import { useLocation, useNavigate } from "react-router-dom";

function Solution() {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state;

    if (!data) {
        return (
            <div className="solution-page">
                <h1>Solution Not Available</h1>

                <p>
                    Submit the problem successfully first
                    to view the solution.
                </p>

                <button onClick={() => navigate("/problems")}>
                    Back to Problems
                </button>
            </div>
        );
    }

    const {
        problem,
        code,
        language,
        result
    } = data;

    return (
        <div className="solution-page">

            <div className="solution-header">

                <div>
                    <span className="accepted-badge">
                        ✓ Accepted
                    </span>

                    <h1>
                        {problem.id}. {problem.title}
                    </h1>

                    <p>
                        Your solution passed all test cases.
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate(`/problem/${problem.id}`)
                    }
                >
                    Back to Problem
                </button>

            </div>


            <div className="solution-stats">

                <div>
                    <strong>
                        {result.passed_tests}
                        /
                        {result.total_tests}
                    </strong>

                    <span>Test Cases</span>
                </div>

                <div>
                    <strong>
                        {result.runtime_ms ?? 0} ms
                    </strong>

                    <span>Runtime</span>
                </div>

                <div>
                    <strong>
                        {result.memory_kb ?? 0} KB
                    </strong>

                    <span>Memory</span>
                </div>

                <div>
                    <strong>
                        {language.toUpperCase()}
                    </strong>

                    <span>Language</span>
                </div>

            </div>


            <section className="solution-section">

                <h2>Your Submitted Code</h2>

                <pre className="solution-code">
                    <code>{code}</code>
                </pre>

            </section>


            <section className="solution-section">

                <h2>Problem Explanation</h2>

                <p>
                    {problem.description}
                </p>

            </section>


            <section className="solution-section">

                <h2>Constraints</h2>

                <ul>
                    {problem.constraints?.map(
                        (constraint, index) => (
                            <li key={index}>
                                {constraint}
                            </li>
                        )
                    )}
                </ul>

            </section>


            <section className="solution-section">

                <h2>Examples</h2>

                {problem.examples?.map(
                    (example, index) => (
                        <div
                            className="solution-example"
                            key={index}
                        >
                            <h3>
                                Example {index + 1}
                            </h3>

                            <p>
                                <strong>Input:</strong>
                            </p>

                            <pre>
                                {example.input}
                            </pre>

                            <p>
                                <strong>Output:</strong>
                            </p>

                            <pre>
                                {example.output}
                            </pre>

                            {example.explanation && (
                                <p>
                                    <strong>
                                        Explanation:
                                    </strong>{" "}
                                    {example.explanation}
                                </p>
                            )}
                        </div>
                    )
                )}

            </section>

        </div>
    );
}

export default Solution;