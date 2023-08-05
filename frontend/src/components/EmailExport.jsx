// client/src/components/EmailExport.js

import React, { useState } from 'react';
import axios from 'axios';

const EmailExport = ({ data }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleExport = async () => {
    try {
      const response = await axios.post('/api/email/sendEmail', {
        recipientEmail,
        subject,
        body,
        attachment: data, // Pass the data to be exported (e.g., PDF content as a base64 string)
      });

      console.log(response.data.message); // Display success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Recipient's Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleExport}>Export via Email</button>
    </div>
  );
};

export default EmailExport;
