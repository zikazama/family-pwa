import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK with explicit projectId
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'family-b3dd3',
  });
}

const db = admin.firestore();
const auth = admin.auth();

async function seed() {
  try {
    // 1. Create male user
    const maleUser = await auth.createUser({
      email: 'fauzi@zira.app',
      password: 'fauzimira',
      displayName: 'Fauzi',
    });
    console.log('Created male user:', maleUser.uid);

    // 2. Create female user
    const femaleUser = await auth.createUser({
      email: 'mira@zira.app',
      password: 'fauzimira',
      displayName: 'Mira',
    });
    console.log('Created female user:', femaleUser.uid);

    // 3. Create couple document in Firestore
    const coupleDoc = {
      myName: 'Fauzi',
      partnerName: 'Mira',
      startDate: '2023-11-12',
      user1: maleUser.uid,
      user2: femaleUser.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection('couples').add(coupleDoc);
    console.log('Created couple document:', coupleDoc);

    // 4. Optionally, create user profile docs
    await db.collection('users').doc(maleUser.uid).set({
      email: maleUser.email,
      username: 'Fauzi',
      gender: 'pria',
      startDate: '2023-11-12',
      partnerUid: femaleUser.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await db.collection('users').doc(femaleUser.uid).set({
      email: femaleUser.email,
      username: 'Mira',
      gender: 'wanita',
      startDate: '2023-11-12',
      partnerUid: maleUser.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Created user profile documents.');

    console.log('Seeder completed successfully!');
    process.exit(0);
  } catch (err: any) {
    if (err.code === 'auth/email-already-exists') {
      console.log('User already exists, skipping creation.');
    } else {
      console.error('Seeder error:', err);
    }
    process.exit(1);
  }
}

seed(); 