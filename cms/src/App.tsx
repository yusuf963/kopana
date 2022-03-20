import React from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  Authenticator,
  buildCollection,
  buildProperty,
  buildSchema,
  EntityReference,
  FirebaseCMSApp,
  NavigationBuilder,
  NavigationBuilderProps
} from "@camberi/firecms";
import "typeface-rubik";
import "typeface-space-mono";
//Import Components
import { playerSchema, localeSchema, coachSchema } from "./Components";

// TODO: Replace with your config
const firebaseConfig = {
  apiKey: "AIzaSyA07wrGQFtRPMM3ckBm_VLULEk9JTndM5c",
  authDomain: "kopana-93ccb.firebaseapp.com",
  projectId: "kopana-93ccb",
  storageBucket: "kopana-93ccb.appspot.com",
  messagingSenderId: "1045364054501",
  appId: "1:1045364054501:web:93ed2810d0558f57c2f70c"
};

export default function App() {

  const navigation: NavigationBuilder = async ({
    user,
    authController
  }: NavigationBuilderProps) => {

    return ({
      collections: [
        buildCollection({
          path: "products",
          schema: playerSchema,
          name: "Players",
          permissions: ({ authController }) => ({
            edit: true,
            create: true,
            // we have created the roles object in the navigation builder
            delete: authController.extra.roles.includes("admin")
          }),
          subcollections: [
            buildCollection({
              name: "Locales",
              path: "locales",
              schema: localeSchema
            })
          ]
        }),
        buildCollection({
          path: "coaches",
          schema: coachSchema,
          name: "Coaches",
          permissions: ({ authController }) => ({
            edit: true,
            create: true,
            delete: authController.extra.roles.includes("admin")
          })
        })
      ]
    });
  };

  const myAuthenticator: Authenticator<FirebaseUser> = async ({
    user,
    authController
  }) => {
    // You can throw an error to display a message
    if (user?.email?.includes("flanders")) {
      throw Error("Stupid Flanders!");
    }

    console.log("Allowing access to", user?.email);
    // This is an example of retrieving async data related to the user
    // and storing it in the user extra field.
    const sampleUserData = await Promise.resolve({
      roles: ["admin"]
    });
    authController.setExtra(sampleUserData);
    return true;
  };

  return <FirebaseCMSApp
    name={"Kapana"}
    authentication={myAuthenticator}
    navigation={navigation}
    firebaseConfig={firebaseConfig}
  />;
}