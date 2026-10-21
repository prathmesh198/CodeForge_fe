import { useState } from "react";
import "./DSAPatterns.css";

const roadmap = [
    {
        name: "Array",
        color: "#673cff",
        patterns: [
            {
                name: "Two Pointer",
                children: [
                    "Opposite ends (left + right)",
                    "Same direction (fast & slow pointers)",
                    "Partition / Dutch flag",
                ],
            },
            {
                name: "Sliding Window",
                children: [
                    "Fixed Size",
                    "Variable Size",
                ],
            },
            {
                name: "Prefix Based",
                children: [
                    "Prefix Sum",
                    "Prefix XOR",
                    "2D Prefix",
                ],
            },
            {
                name: "Kadane's / Subarray",
                children: [
                    "Max subarray sum (Kadane's)",
                    "Max product subarray",
                    "Subarray with given XOR / sum",
                ],
            },
            {
                name: "Binary Search",
                children: [
                    "on index",
                    "on answer",
                ],
            },
        ],
    },

    {
        name: "String",
        color: "#d000d8",
        patterns: [
            {
                name: "Sliding Window",
                children: [
                    "Longest substring without repeat",
                    "Minimum window substring",
                    "Anagram / permutation in string",
                ],
            },
            {
                name: "Two Pointers",
                children: [
                    "Palindrome check",
                    "Reverse words / characters",
                    "String compression",
                ],
            },
            {
                name: "Pattern Matching",
                children: [
                    "KMP (failure function)",
                    "Rabin-Karp (rolling hash)",
                    "Z-algorithm",
                ],
            },
        ],
    },

    {
        name: "Hash map",
        color: "#0084d6",
        patterns: [
            {
                name: "Frequency Based",
                children: [
                    "Count frequency",
                    "Character frequency",
                    "Element frequency",
                ],
            },
            {
                name: "Lookup Based",
                children: [
                    "Two Sum",
                    "Complement lookup",
                    "Fast existence check",
                ],
            },
            {
                name: "Set Based",
                children: [
                    "Duplicate detection",
                    "Unique elements",
                    "Intersection",
                ],
            },
        ],
    },

    {
        name: "Stack",
        color: "#009f91",
        patterns: [
            {
                name: "Monotonic Stack",
                children: [
                    "Next Greater Element",
                    "Next Smaller Element",
                    "Previous Greater Element",
                ],
            },
            {
                name: "Parentheses",
                children: [
                    "Valid Parentheses",
                    "Minimum Remove",
                    "Longest Valid Parentheses",
                ],
            },
            {
                name: "Expression",
                children: [
                    "Infix",
                    "Prefix",
                    "Postfix",
                ],
            },
        ],
    },

    {
        name: "QUEUE / DEQUE",
        color: "#d77900",
        patterns: [
            {
                name: "Basic Queue",
                children: [
                    "FIFO",
                    "Circular Queue",
                    "Queue using Stack",
                ],
            },
            {
                name: "Deque",
                children: [
                    "Sliding Window Maximum",
                    "Sliding Window Minimum",
                ],
            },
        ],
    },

    {
        name: "LINKED LIST",
        color: "#e0b400",
        patterns: [
            {
                name: "Fast & Slow",
                children: [
                    "Find Middle",
                    "Detect Cycle",
                    "Cycle Start",
                ],
            },
            {
                name: "Reverse",
                children: [
                    "Reverse Linked List",
                    "Reverse in Groups",
                    "Reverse Between",
                ],
            },
            {
                name: "Merge",
                children: [
                    "Merge Two Lists",
                    "Merge K Lists",
                    "Intersection",
                ],
            },
        ],
    },

    {
        name: "TREES",
        color: "#f00055",
        patterns: [
            {
                name: "DFS",
                children: [
                    "Preorder",
                    "Inorder",
                    "Postorder",
                ],
            },
            {
                name: "BFS",
                children: [
                    "Level Order Traversal",
                    "Zigzag Level Order",
                    "Right Side View",
                    "Minimum Depth",
                    "Maximum Width",
                ],
            },
            {
                name: "Path Based",
                children: [
                    "Root to Leaf Path",
                    "Path Sum",
                    "Maximum Path Sum",
                ],
            },
            {
                name: "BST",
                children: [
                    "Search BST",
                    "Insert BST",
                    "Delete BST",
                    "Range Search",
                ],
            },
        ],
    },

    {
        name: "Recursion",
        color: "#8d00d9",
        patterns: [
            {
                name: "Subsets",
                children: [
                    "Subsets",
                    "Subsets II",
                ],
            },
            {
                name: "Permutations",
                children: [
                    "Permutations",
                    "Unique Permutations",
                ],
            },
            {
                name: "Combinations",
                children: [
                    "Combination Sum",
                    "Combination Sum II",
                ],
            },
            {
                name: "Backtracking",
                children: [
                    "Word Search",
                    "N Queens",
                    "Sudoku",
                ],
            },
        ],
    },

    {
        name: "Heap",
        color: "#008e82",
        patterns: [
            {
                name: "Top K",
                children: [
                    "Kth Largest",
                    "Kth Smallest",
                    "Top K Frequent",
                ],
            },
            {
                name: "Two Heaps",
                children: [
                    "Median from Data Stream",
                    "Sliding Window Median",
                ],
            },
            {
                name: "Greedy + Heap",
                children: [
                    "Meeting Rooms",
                    "Task Scheduling",
                ],
            },
        ],
    },

    {
        name: "GRAPHS",
        color: "#786a4d",
        patterns: [
            {
                name: "BFS",
                children: [
                    "Shortest Path",
                    "Multi Source BFS",
                    "Level Traversal",
                ],
            },
            {
                name: "DFS",
                children: [
                    "Connected Components",
                    "Number of Islands",
                    "Cycle Detection",
                ],
            },
            {
                name: "Topological Sort",
                children: [
                    "Course Schedule",
                    "Kahn's Algorithm",
                    "Dependency Graph",
                ],
            },
            {
                name: "Shortest Path",
                children: [
                    "Dijkstra",
                    "Bellman Ford",
                    "Floyd Warshall",
                ],
            },
            {
                name: "DSU",
                children: [
                    "Union Find",
                    "Connected Components",
                    "Kruskal",
                ],
            },
        ],
    },

    {
        name: "TRIE",
        color: "#a94d4d",
        patterns: [
            {
                name: "Basic Trie",
                children: [
                    "Insert",
                    "Search",
                    "Starts With",
                ],
            },
            {
                name: "Trie Applications",
                children: [
                    "Prefix Search",
                    "Word Search",
                    "Auto Complete",
                ],
            },
        ],
    },

    {
        name: "DYNAMIC PROGRAMMING",
        color: "#8797a5",
        patterns: [
            {
                name: "1D DP",
                children: [
                    "Climbing Stairs",
                    "House Robber",
                    "Fibonacci",
                ],
            },
            {
                name: "2D / Grid DP",
                children: [
                    "Unique Paths",
                    "Minimum Path Sum",
                    "Grid Obstacles",
                ],
            },
            {
                name: "Knapsack",
                children: [
                    "0/1 Knapsack",
                    "Unbounded Knapsack",
                    "Subset Sum",
                ],
            },
            {
                name: "Sequence DP",
                children: [
                    "LCS",
                    "LIS",
                    "Edit Distance",
                ],
            },
            {
                name: "Interval DP",
                children: [
                    "Matrix Chain",
                    "Burst Balloons",
                    "Palindrome Partition",
                ],
            },
        ],
    },

    {
        name: "GREEDY",
        color: "#d000c9",
        patterns: [
            {
                name: "Interval",
                children: [
                    "Merge Intervals",
                    "Activity Selection",
                    "Non Overlapping Intervals",
                ],
            },
            {
                name: "Jump Game",
                children: [
                    "Jump Game",
                    "Jump Game II",
                    "Minimum Jumps",
                ],
            },
            {
                name: "Scheduling",
                children: [
                    "Meeting Rooms",
                    "Job Sequencing",
                    "Task Scheduling",
                ],
            },
        ],
    },

    {
        name: "BIT MANIPULATION",
        color: "#006fc9",
        patterns: [
            {
                name: "Basic Bits",
                children: [
                    "Check Bit",
                    "Set Bit",
                    "Clear Bit",
                ],
            },
            {
                name: "XOR",
                children: [
                    "Single Number",
                    "Missing Number",
                    "XOR Pair",
                ],
            },
            {
                name: "Bit Tricks",
                children: [
                    "Power of Two",
                    "Count Set Bits",
                    "Brian Kernighan",
                ],
            },
        ],
    },

    {
        name: "Sorting Algorithms",
        color: "#aab6c0",
        patterns: [
            {
                name: "Basic Sorting",
                children: [
                    "Bubble Sort",
                    "Selection Sort",
                    "Insertion Sort",
                ],
            },
            {
                name: "Divide & Conquer",
                children: [
                    "Merge Sort",
                    "Quick Sort",
                ],
            },
            {
                name: "Special Sorting",
                children: [
                    "Counting Sort",
                    "Cyclic Sort",
                ],
            },
        ],
    },

    {
        name: "RANGE STRUCTURES",
        color: "#008d82",
        patterns: [
            {
                name: "Segment Tree",
                children: [
                    "Range Sum",
                    "Range Minimum",
                    "Range Maximum",
                ],
            },
            {
                name: "Fenwick Tree",
                children: [
                    "Prefix Query",
                    "Point Update",
                    "Range Query",
                ],
            },
        ],
    },
];


function PatternBranch({ pattern, color }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="pattern-branch">

            <div className="pattern-row">

                <div
                    className="pattern-node"
                    style={{
                        "--branch-color": color
                    }}
                    onClick={() => setOpen(!open)}
                >
                    <span className="node-dot" />
                    <span>{pattern.name}</span>

                    <span className="expand-icon">
                        {open ? "−" : "+"}
                    </span>
                </div>

                {open && (
                    <div className="children-container">

                        {pattern.children.map((child, index) => (
                            <div
                                className="child-node"
                                key={index}
                                style={{
                                    "--branch-color": color
                                }}
                            >
                                <span className="child-line" />
                                <span>{child}</span>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}


function Category({ category, index }) {

    const [open, setOpen] = useState(true);

    return (
        <section
            className="category-section"
            style={{
                "--category-color": category.color
            }}
        >

            <div className="category-head">

                <div
                    className="category-node"
                    onClick={() => setOpen(!open)}
                >

                    <span className="category-dot" />

                    <span className="category-title">
                        {category.name}
                    </span>

                    <span className="category-count">
                        {category.patterns.reduce(
                            (total, pattern) =>
                                total + pattern.children.length,
                            0
                        )}
                    </span>

                    <span className="category-toggle">
                        {open ? "−" : "+"}
                    </span>

                </div>

            </div>

            {open && (

                <div className="patterns-container">

                    {category.patterns.map(
                        (pattern, patternIndex) => (
                            <PatternBranch
                                key={patternIndex}
                                pattern={pattern}
                                color={category.color}
                            />
                        )
                    )}

                </div>

            )}

        </section>
    );
}


export default function DSAPatterns() {

    const [search, setSearch] = useState("");

    const filteredRoadmap = roadmap
        .map((category) => ({
            ...category,

            patterns: category.patterns
                .map((pattern) => ({
                    ...pattern,

                    children: pattern.children.filter((child) =>
                        child
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ||
                        pattern.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ||
                        category.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ),
                }))
                .filter(
                    (pattern) =>
                        pattern.children.length > 0 ||
                        pattern.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ),
        }))
        .filter(
            (category) =>
                category.patterns.length > 0 ||
                category.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );

    return (
        <div className="roadmap-page">

            {/* HEADER */}

            <header className="roadmap-header">

                <div>

                    <div className="roadmap-label">
                        CODEFORGE • DSA ROADMAP
                    </div>

                    <h1>
                        DSA
                        <span> Patterns</span>
                    </h1>

                    <p>
                        Learn the pattern. Understand the approach.
                        Solve the problem.
                    </p>

                </div>

                <div className="roadmap-stats">

                    <div>
                        <strong>{roadmap.length}</strong>
                        <small>Categories</small>
                    </div>

                    <div>
                        <strong>
                            {roadmap.reduce(
                                (total, category) =>
                                    total + category.patterns.length,
                                0
                            )}
                        </strong>
                        <small>Patterns</small>
                    </div>

                </div>

            </header>


            {/* SEARCH */}

            <div className="roadmap-toolbar">

                <div className="search-box">

                    <span>⌕</span>

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search pattern, category or technique..."
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                        >
                            ×
                        </button>
                    )}

                </div>

                <div className="toolbar-info">
                    Click any node to expand / collapse
                </div>

            </div>


            {/* ROOT */}

            <div className="mindmap">

                <div className="root-node">

                    <div className="root-glow" />

                    <div className="root-title">
                        DSA Patterns
                    </div>

                    <div className="root-subtitle">
                        CodeForge
                    </div>

                </div>


                {/* ALL CATEGORIES */}

                <div className="categories">

                    {filteredRoadmap.map(
                        (category, index) => (
                            <Category
                                key={category.name}
                                category={category}
                                index={index}
                            />
                        )
                    )}

                </div>

            </div>

        </div>
    );
}