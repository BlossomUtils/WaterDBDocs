import React, { useState } from "react";
import Layout from '@theme/Layout';

const DiscordThreadWebhook = () => {
  const [username, setUsername] = useState("");
  const [threadTitle, setThreadTitle] = useState("");
  const [embedBody, setEmbedBody] = useState("");
  const [status, setStatus] = useState("");

  // Predefined Discord Webhook URL
  const { webhookUrl } = require("./beta/config.json")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!threadTitle || !embedBody) {
      setStatus("Thread title and embed body are required.");
      return;
    }

    // Payload for Discord
    const payload = {
      thread_name: threadTitle,
      embeds: [
        {
          title: threadTitle,
          description: embedBody,
          color: 5814783,
          footer: {
            text: `Sent by ${username}`
          },
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setThreadTitle("");
        setEmbedBody("");
      } else {
        setStatus("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending the message.");
    }
  };

  return (
    <Layout>
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Blossom Bug Reports (BETA)</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Discord Username:
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Thread Title:
          <input
            type="text"
            placeholder="Enter thread title"
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Embed Body:
          <textarea
            placeholder="Enter embed body"
            value={embedBody}
            onChange={(e) => setEmbedBody(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", height: "100px" }}
          ></textarea>
        </label>
        <button type="submit" style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Send Message
        </button>
      </form>
      {status && <p style={{ marginTop: "20px", color: status.includes("successfully") ? "green" : "red" }}>{status}</p>}
    </div>
    </Layout>
  );
};

export default DiscordThreadWebhook;
