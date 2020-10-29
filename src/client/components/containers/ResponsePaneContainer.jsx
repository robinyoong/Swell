import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EventsContainer from './EventsContainer'
import HeadersContainer from './HeadersContainer'
import CookiesContainer from './CookiesContainer'
import StatusButtons from '../display/StatusButtons'
import WebSocketWindow from "../display/WebSocketWindow";
import ReqResCtrl from "../../controllers/reqResController";

export const ResponsePaneContainer = () => {
  const [activeTab, setActiveTab] = useState('events');
  const currentResponse = useSelector(store => store.business.currentResponse); 
  
  console.log('currentResponse on ResponsePaneContainer --> ', currentResponse);
  // currentResponse.request.network


  return (
      <div className='column is-one-third is-flex is-flex-direction-column is-tall'>
        {/* HEADER */}
          <div className="hero is-primary header-bar is-flex is-flex-direction-row is-justify-content-center">
            <h3>
              Responses
            </h3>
            <StatusButtons currentResponse={currentResponse} />
          </div>
        {/* IF WEBSOCKETS */}
        {currentResponse.request.network === 'ws' && 
          <WebSocketWindow
            key={0}
            outgoingMessages={currentResponse.request.messages}
            incomingMessages={currentResponse.response.messages}
            content={currentResponse}
            connection={currentResponse.connection} 
          />
        }
        
        {/* IF NOT WEBSOCKETS */}
        {currentResponse.request.network !== 'ws' && 
        <div className="is-flex is-flex-direction-column is-tall">
          {/* TAB SELECTOR */}
          <div className="tabs">
            <ul className="columns is-gapless">
              <li className={`column ${activeTab === 'events' ? 'is-active' : ''}`}>
              <a 
                onClick={() => setActiveTab('events')}
              > Events
              </a>
            </li>
              <li className={`column ${activeTab === 'headers' ? 'is-active' : ''}`}>
                <a 
                  onClick={() => setActiveTab('headers')}
                > 
                {currentResponse.gRPC === true ? 'Metadata' : 'Headers'}
                </a>
              </li>
              <li className={`column ${activeTab === 'cookies' ? 'is-active' : ''}`}>
                <a 
                  onClick={() => setActiveTab('cookies')}
                > Cookies
                </a>
              </li>
            </ul>
          </div>
          {/* RESPONSES CONTENT */}
        <div className="is-flex-grow-3 add-vertical-scroll is-not-3rem-tall">
          { activeTab === 'events' && <EventsContainer currentResponse={currentResponse} />}
          { activeTab === 'headers' && <HeadersContainer currentResponse={currentResponse}/>}
          { activeTab === 'cookies' && <CookiesContainer currentResponse={currentResponse}/>}
        </div>
        { currentResponse.id 
          && currentResponse.request.network !== 'ws'
          && currentResponse.request.method !== 'SUBSCRIPTION' &&
          <div className="is-3rem-footer ml-3 mr-3">
            <button
              className="button is-normal is-fullwidth is-primary-100 is-button-footer is-margin-top-auto add-request-button"
              onClick={() => {
                ReqResCtrl.openReqRes(currentResponse.id);
              }}
              type="button"
            >
              Re-Send Request
            </button>
          </div>
        }
      </div>
        }
    </div>

  )

}

export default ResponsePaneContainer