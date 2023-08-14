import React from 'react';
import Typography from '@mui/material/Typography';

function MistakeList({ showChatGPTHint }) {
    return (
        <div>
            {showChatGPTHint && (
                <Typography>
                    Common Python Regex Mistakes:
                    <ul>
                        <li>Using `.` without realizing it matches any character (including whitespace).</li>
                        <li>Forgetting to escape special characters like `.` or `*` when they should be matched literally.</li>
                        <li>Overusing or underusing capturing groups without understanding their implications.</li>
                        <li>Not using raw strings (`r"..."`) which can lead to unintended escape sequences.</li>
                        <li>Assuming `^` and `$` always match the start and end of a string, forgetting they can also match the start and end of a line in multiline mode.</li>
                        <li>Confusing the greedy (`*`, `+`) and non-greedy (`*?`, `+?`) quantifiers.</li>
                        <li>Not considering edge cases when using character classes. For instance, `[\d\D]` will match any character, but can be confusing to readers.</li>
                        <li>Forgetting to handle cases where there might be optional matches.</li>
                        <li>Using `re.match()` when `re.search()` is more appropriate, and vice versa.</li>
                    </ul>
                </Typography>
            )}
        </div>
    );
}

export default MistakeList;
