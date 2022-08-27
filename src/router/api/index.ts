import express from 'express';
import BarcoHandler from '../../handlers/BarcoHandler';
import EquipmentHandler from '../../handlers/EquipmentHandler';

const router = express.Router();

router.get('/getEq', EquipmentHandler.getEquipments);
router.post('/humidity', BarcoHandler.getHumidity);
router.post('/command', EquipmentHandler.runCommand);
router.post('/commandAll', EquipmentHandler.runCommandAll);

export default router;
