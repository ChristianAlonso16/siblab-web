import React, { useState } from 'react'
import { HistoryComponent } from '../history/HistoryComponent';
import StudentsComponent from '../students/StudentsComponent';

const Tab = () => {
    

    const tabs = [
        {
            name: 'default',
            label: 'historial',
            content: (<HistoryComponent/>)
        },
        {
            name: 'name',
            label: 'Estudiantes',
            content: (<StudentsComponent/>)
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].name);

    const handleClick = (tabName) => {
        setActiveTab(tabName);
    };
        
    return (
            <div className="tab-menu">
                <div style={{marginLeft:'300px', marginTop:'20px'}}>
                    <ul className="tab-menu-list">
                        {tabs.map((tab) => (
                        <li
                            key={tab.name}
                            className={`tab-menu-item${tab.name === activeTab ? ' tab-menu-item--active' : ''}`}
                            onClick={() => handleClick(tab.name)}
                        >
                            {tab.label}
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="tab-menu-content">
                    {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`tab-menu-panel${tab.name === activeTab ? ' tab-menu-panel--active' : ''}`}
                    >
                        {tab.content}
                    </div>
                    ))}
                </div>
            </div>
        );
};
    
export default Tab