import * as React from 'react';
import UserInterface from '../../interfaces/UserInterface';

interface Props {
  currentTab: string,
  user: UserInterface,
  onClickTab(tab: string): void
}
export default class TabsHomePage extends React.PureComponent<Props>{
  render(){
    const { user, currentTab, onClickTab } = this.props;
    return (
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          { (user && user.token) &&
            <li className="nav-item">
              <a href="" className={`nav-link ${currentTab === 'feed' ? 'active' : ''}`} onClick={(e) => {
                e.preventDefault();
                typeof onClickTab === 'function' && onClickTab('feed')
              }}>
                <i className="ion-pound" />Feed
              </a>
            </li>
          }
          <li className="nav-item">
            <a href="" className={`nav-link ${currentTab === 'global' ? 'active' : ''}`} onClick={(e) => {
              e.preventDefault();
              typeof onClickTab === 'function' && onClickTab('global')
            }}>
              <i className="ion-pound" />Global Feed
            </a>
          </li>
          { (currentTab !== 'feed' && currentTab !== 'global') &&
            <li className="nav-item">
              <a href="" className={`nav-link ${currentTab !== 'feed' && currentTab !== 'global' ? 'active' : ''}`} onClick={(e) => {
                e.preventDefault();
                typeof onClickTab === 'function' && onClickTab(currentTab)
              }}>
                <i className="ion-pound" />{currentTab}
              </a>
            </li>
          }
        </ul>
      </div>
    );
  }
}