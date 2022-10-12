import { HttpsError } from 'firebase-functions/v1/auth';
import { Parking } from '../models/parking';
import { firestore } from '../config/firebase';

export class ParkingsService {
  private collectionRef: FirebaseFirestore.CollectionReference;

  constructor() {
    this.collectionRef = firestore.collection('parkings');
  }

  async fetch(id: string): Promise<Parking> {
    const snapshot = await this.collectionRef.doc(id).get();

    const data = snapshot.data();

    if (!data) {
      throw new HttpsError(
        'not-found',
        `Não foi possível achar o estacionamento: ${id}`
      );
    }

    return new Parking({ id: data.id, label: data.label, endTime: data.end_time });
  }
}
