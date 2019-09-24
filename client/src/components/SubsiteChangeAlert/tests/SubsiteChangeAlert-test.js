/* global jest, describe, it, expect */
import React from 'react';
import SubsiteChangeAlert from '../SubsiteChangeAlert';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('SubsiteChangeAlert', () => {
  describe('handleRevert', () => {
    it('delegates to the callback with relveant properties', () => {
      const callbackFn = jest.fn();
      const alert = shallow(
        <SubsiteChangeAlert
          myTabSubsiteID="1"
          myTabSubsiteName="one"
          revertCallback={callbackFn}
        />
      );
      alert.instance().handleRevert();
      expect(callbackFn.mock.calls).toEqual([['1', 'one']]);
    });
  });
  describe('getMessage', () => {
    it('should show the old subsite name correctly', () => {
      const alert = shallow(
        <SubsiteChangeAlert
          myTabSubsiteName="oldSite"
          otherTabSubsiteName="newSite"
        />
      );
      expect(alert.instance().getMessage()).toContain('continue editing oldSite');
    });
    it('should show the new active subsite name', () => {
      const alert = shallow(
        <SubsiteChangeAlert
          myTabSubsiteName="oldSite"
          otherTabSubsiteName="newSite"
        />
      );
      expect(alert.instance().getMessage()).toContain('changed to newSite');
    });
  });
});
