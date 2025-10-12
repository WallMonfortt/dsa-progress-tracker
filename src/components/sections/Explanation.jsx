
export function Explanation() {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 dark:bg-gray-800 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-400">
                How Spaced Repetition Works
            </h3>
            <div className="text-blue-700 space-y-2 dark:text-blue-400">
                <p>
                    This tracker uses spaced repetition to help you retain coding
                    problems long-term.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 className="font-semibold mb-2">Review Schedule:</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <strong>R1:</strong> Review after 1 day
                            </li>
                            <li>
                                <strong>R2:</strong> Review after 3 days
                            </li>
                            <li>
                                <strong>R3:</strong> Review after 7 days (1 week)
                            </li>
                            <li>
                                <strong>R4:</strong> Review after 14 days (2 weeks)
                            </li>
                            <li>
                                <strong>R5:</strong> Review after 30 days (1 month)
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">How to Use:</h4>
                        <ul className="space-y-1 text-sm">
                            <li>1. Mark a problem as solved when you complete it</li>
                            <li>2. Review buttons (R1-R5) will show required dates</li>
                            <li>
                                3. Click review buttons when you successfully review
                            </li>
                            <li>4. Use "Due Today/Overdue" filter to see what needs review</li>
                            <li>5. Check the Official Roadmap for study guidance</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
