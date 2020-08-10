import React from 'react';

import Spinner from 'components/Spinner'
import { StandardDrink } from 'types/drinks'
import './styles.css';

export default function Drink({ drink }: {drink: StandardDrink}) {
  return (
    <div className='ac-drink-container'>
      <img src={drink.icon} alt='drink' style={{ marginTop: '10px' }}/>
      <div className='ac-drink-name-container'>
        <div className='ac-drink-type'>{drink.type}</div>
        <div className='ac-drink-subtype'>{drink.subType}</div>
        <div className='ac-drink-percent'><span className='ac-drink-percent-number'>{drink.percent}</span>%</div>
      </div>
      <div className='ac-drink-unit-container'>
        <div style={{ display: 'flex' }}>
          <div className='ac-drink-volume'>
            <span className='ac-drink-volume-span'>{drink.volume1}{(typeof(drink.volume1) === 'number') && ('ml')}</span>
          </div>
          <Spinner value={0} suffix={drink.unit} min={0} max={20} step={0.5} />
        </div>
        {drink.volume2 && (
          <div style={{ display: 'flex' }}>
            <div className='ac-drink-volume'>{drink.volume2}ml</div>
            <Spinner value={0} suffix={drink.unit} min={0} max={20} step={0.5} />
          </div>
        )}
      </div>
    </div>
  )
}
