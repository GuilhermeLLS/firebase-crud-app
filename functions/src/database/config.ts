import admin, { ServiceAccount } from "firebase-admin";
import permissions from "../config/permissions.json";

export function initializeFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(permissions as ServiceAccount),
        databaseURL: "https://fir-api-bc5bd.firebaseio.com",
    });
}

export function createDbInstance() {
    // ! this is not OK. I can't use an admin function without calling initializeApp in the same scope;
    initializeFirebase();
    return admin.firestore();
}
