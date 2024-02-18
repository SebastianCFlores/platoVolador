import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage} from '@angular/fire/storage';

const firebaseConfig = 
  {
    apiKey: "AIzaSyBuC96tE6qc2n2ncqmDzQtHKz-meY9IqYc",
    authDomain: "miprimertestapp-9b2c3.firebaseapp.com",
    projectId: "miprimertestapp-9b2c3",
    storageBucket: "miprimertestapp-9b2c3.appspot.com",
    messagingSenderId: "33710573890",
    appId: "1:33710573890:web:64ad33f06a425dea2de0db"
  }


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
  importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ])
  ]
};
