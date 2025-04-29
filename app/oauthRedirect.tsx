import { useEffect } from 'react';
import {router} from "expo-router";

export default function OauthRedirect() {
    useEffect(() => {
        router.replace('/dashboard');
    },[])

    return null;
}