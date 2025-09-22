document.getElementById('login-btn').addEventListener('click', () => {
  const clientId = "YOUR_CLIENT_ID";
  const redirectUri = encodeURIComponent("https://leafy-gnome-08e6f8.netlify.app/"); // your deployed site
  const scopes = encodeURIComponent("identify guilds");
  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;
  window.location.href = oauthUrl;
});

// After redirect, parse token and show user info
window.addEventListener('load', () => {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      fetch("https://discord.com/api/users/@me", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(user => {
        const btn = document.getElementById('login-btn');
        btn.innerText = `Logged in as ${user.username}#${user.discriminator}`;
        btn.style.background = "green";
        btn.style.pointerEvents = "none";
      }).catch(console.error);
    }
  }
});
