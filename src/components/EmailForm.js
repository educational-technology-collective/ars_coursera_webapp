import React, { useState } from "react";

function hashEmail(email) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash << 5) - hash + email.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function EmailForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const hashedValue = hashEmail(email);
        const route = ['/intro1', '/intro2', '/intro3'][hashedValue % 3];
        window.location.href = route;
    };

    return (
        <div>
            <h1>Email Input</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@umich.edu"
                    pattern="[a-zA-Z0-9._%+-]+@umich\.edu"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EmailForm;
