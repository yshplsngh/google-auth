import express, {Request, Response} from "express";
import axios from "axios";
import qs from "qs"
import {UserModel} from "./UserModel";

const router = express.Router();

// create this in service folder
const fromClientId = process.env.GOOGLE_CLIENT_ID as string;
const fromClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const fromRedirectUri = process.env.GOOGLE_REDIRECT_URI as string;
const fromFrontendOrigin = process.env.FRONTENT_ORIGIN as string;

interface GoogleTokensResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

async function getGoogleOauthToken({code}: { code: string }): Promise<GoogleTokensResult> {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: fromClientId,
        client_secret: fromClientSecret,
        redirect_uri: fromRedirectUri,
        grant_type: "authorization_code",
    }

    try {
        const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return res.data;
    } catch (error: any) {
        console.error(error.response.data.error);
        throw new Error(error.message);
    }
}

async function getGoogleUser({id_token, access_token}: {
    id_token: string,
    access_token: string
}): Promise<GoogleUserResult> {
    const url: string = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    try {
        const res = await axios.get<GoogleUserResult>(url, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error(error.response.data.error);
        throw new Error(error.message);
    }
}


router.route('/').get(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const {id_token, access_token, refresh_token} = await getGoogleOauthToken({code})

        const googleResult = await getGoogleUser({id_token, access_token})

        // here check this <googleResult> using zod i'am just using simpleCheck of email only for practice
        if (!googleResult.verified_email) {
            return res.send(403).send("Google account is not verified");
        }

        const user = await UserModel.findOneAndUpdate({
            email: googleResult.email
        }, {
            email: googleResult.email,
            name: googleResult.name,
            picture: googleResult.picture,
        }, {
            upsert:true,
            new:true
        });

        console.log(user);



        res.status(200).send("working");
    } catch (error) {
        res.redirect(`${fromFrontendOrigin}/oauth/error`);
    }
})

export {router as googleRouter}