import HTTP_STATUS from '../constants/httpStatus.js';
import * as response from '../services/response.service.js';
import * as adviceService from '../services/adviser.service.js';
import {getActivity} from '../services/activity.service.js';

// [GET] advisers
export const getAdvisers = async (req,res) => {

    try {
    const { userId, destinationId, time, activityId} = req.query;
    if (!userId || !destinationId || !time || !activityId) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send('Missing required parameters');
    }
    const User = (await response.getInfoUser(userId)).user;
    const Destination =  (await response.getInfoDestination(destinationId)).destination;
    const Activity = (await getActivity(activityId)).data;

    const resp = await adviceService.getAdvisers(User, Destination, Activity, time);
    

    let result = resp.substring(7);
    result = result.slice(0, -3);
    //remove 7 first characters
    res.status(HTTP_STATUS.OK).json({
        data: JSON.parse(result),
        message: 'Advisers retrieved successfully'
    });


   
    }
    catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: error.message
        });
    }

    
}
