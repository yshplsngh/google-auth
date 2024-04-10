function getGoogleOAuthURL(){
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const fromClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const fromRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const options = {
        redirect_uri:fromRedirectUri,
        client_id:fromClientId,
        access_type:"offline",
        response_type:"code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    }

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
}
export default getGoogleOAuthURL;