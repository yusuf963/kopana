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
  apiKey: "AIzaSyDJaQC5qMPOmxspLwkQ66gcab4ufTs_JW0",
  authDomain: "kopana-6dcad.firebaseapp.com",
  projectId: "kopana-6dcad",
  storageBucket: "kopana-6dcad.appspot.com",
  messagingSenderId: "953286394986",
  appId: "1:953286394986:web:147b4404d08ca1a2a0f613"
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