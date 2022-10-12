import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ParkingsService } from '../services/parkings-service';

export const onParkingLotOccupated = functions.firestore
  .document('parkings/{parkingId}/parking_lots/{lotId}')
  .onUpdate(async (change, context) => {
    const parking = await new ParkingsService().fetch(context.params.parkingId);

    const userId = change.after.data().occupant_id;

    console.log(userId);

    console.log(parking);

    if (userId) {
      await admin.messaging().sendToTopic(userId, {
        notification: {
          title: `Bem vindo ao estacionamento: ${parking.label}`,
          body: `Não se esqueça de retirar o seu carro até as ${parking.endTime}`,
        },
      });
    }
  });
