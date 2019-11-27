import React from 'react'
import { shallow, mount } from 'enzyme'
import events from '../../mocks/conferences'
import { EventRecord } from '../../ducks/events'

import { EventList } from './EventList'
import Loader from '../common/Loader'

//Для теста преобразуем массив в Map объект
const testEvents = events.map( event => new EventRecord( { ...event, uid: Math.random().toString() } ))

//Проверим загружается ли лоадер
it('should render loader', () => {
    const container = shallow(<EventList loading={true} fetchAll={() => {}} />)

    expect(container.contains(<Loader/>))
})


//Проверим сколько отредерилось строк в таблици с эвентами
it('should render event list', () => {
    const container = shallow(
        <EventList 
            loading={false} 
            fetchAll={() => {}} 
            events={testEvents} 
        />
    )

    const rows = container.find('.test--event-list__row')

    expect(rows.length).toEqual(testEvents.length)
})

//Проверим просит ли компонет меня загрузить данные когда он рендерится
//Он должен вызвать done когда рендериться
it('should request fetch data', (done) => {
    mount(<EventList events={[]} fetchAll={done} />)
})

//Проверим на нажатие на компонент
it('should select event', () => {

    //При клике сохраняем uid в selected
    let selected = null
    const selectEvent = uid => selected = uid

    const container = mount(
        <EventList 
            events={testEvents}
            fetchAll={() => {}}
            selectEvent={selectEvent}
        />
    )

    //Симулируем клик по первой строке таблицы
    container.find('.test--event-list__row').first().simulate('click')

    //Сравниваем uid
    expect(selected).toEqual(testEvents[0].uid)
})


