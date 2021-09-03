const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      admin: true,
    };
    try {
      await admin.auth().setCustomUserClaims(authUser.uid, customClaims);

      return db
        .collection("admin")
        .doc(authUser.uid)
        .set({
          email: authUser.email,
          role: customClaims,
        });
    } catch (error) {
      console.log(error);
    }
  }
});
