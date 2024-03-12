import './FilterContainer.css'
import { Button, Select } from 'antd';

const FilterChatContainer = () => {
    return(
        <div className='filter-chat-container'>
         <div className='btn-container'>
            <input
                type="radio"
                name="Regular"
                value="regular"
                // checked={selectedPlan === 'regular'}
                // onChange={() => handlePlanSelection('regular')}
              />
              <label className='btn-text'>Regular</label>
          </div>
  
          <div className='btn-container'>
              <input
                type="radio"
                name="files"
                value="Across files"
                // checked={selectedPlan === 'acrossFiles'}
                // onChange={() => handlePlanSelection('acrossFiles')}
                />
            <label className='btn-text'>Across Files</label>
          </div>

          <div className='btn-container'>
              <input
                type="radio"
                name="files"
                value="Across files"
                // checked={selectedPlan === 'acrossFiles'}
                // onChange={() => handlePlanSelection('acrossFiles')}
                />
            <label className='btn-text'>Across Files</label>
          </div>
      </div>
    )
}

export default FilterChatContainer;