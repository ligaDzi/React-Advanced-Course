import {OrderedMap, Map} from 'immutable'

export function generateID() {
    return Date.now() + Math.random();
}

/**
 * Эта ф-ция похожая на arrToMap() из начального курса по react,
 * только эта ф-ция преобразует данные пришедшие из firebase в имутабильный Map
 */
export function fbDatatoEntities(data, RecordModel = Map) {
    
    return ( new OrderedMap(data) ).mapEntries( ([uid, value]) => ( 

        [uid, (new RecordModel(value)).set('uid', uid)]

    ))
}
