/* jslint browser: true, nomen: true */
/* global window, jQuery */
import React from 'react';
import ReactDom from 'react-dom';
import { loadComponent } from 'lib/Injector';
import createEvent from 'legacy/createEvent';

jQuery.entwine('ss', ($) => {
  $('#SubsitesSelect').entwine({
    ModalNode: null,
    onadd() {
      // Storage has updated - another tab has changed the subsite info
      window.addEventListener('storage', (storageEvent) => {
        if (storageEvent.key === 'subsiteInfo') {
          const subsiteChangeEvent = createEvent('subsitechange', { subsiteInfo: storageEvent.newValue });
          window.dispatchEvent(subsiteChangeEvent);
        }
      }, false);

      window.addEventListener('subsitechange', (subsiteChangeEvent) => {
        const subsiteNotice = this.getModalNode();
        const subsiteInfo = JSON.parse(subsiteChangeEvent.subsiteInfo);
        if (subsiteNotice) {
          ReactDom.unmountComponentAtNode(subsiteNotice);
        }
        if (subsiteInfo.subsiteID !== this.val()) {
          this.showReactiveNotice(subsiteInfo);
        }
      }, false);

      // Dropdown change trigger
      this.on('change', () => {
        const subsiteID = this.val();
        window.location.search = $.query.set('SubsiteID', subsiteID);
      });

      // We need to set when a page loads, as it may be e.g. the refresh of a currently blocked tab.
      this.storeSubsiteInfo();
    },
    storeSubsiteInfo() {
      const subsiteID = this.val();
      const subsiteInfo = {
        subsiteID,
        subsiteName: $(`[value="${subsiteID}"]`, this).text()
      };
      window.localStorage.setItem('subsiteInfo', JSON.stringify(subsiteInfo));
    },
    showReactiveNotice(subsiteInfo) {
      // React business
      const modalContainer = window.document.createElement('div');
      window.document.body.appendChild(modalContainer);
      const ChangeAlert = loadComponent('SubsiteChangeAlert');
      const selectedIndex = this.get(0).selectedIndex;
      ReactDom.render(
        <ChangeAlert
          newSubsiteID={parseInt(this.val(), 10)}
          newSubsiteName={subsiteInfo.subsiteName}
          thisSubsite={this.get(0).options[selectedIndex].text}
        />,
        modalContainer
      );
      this.setModalNode(modalContainer);
    }
  });

  /*
   * Reload subsites dropdown when links are processed
   */
  $('.cms-container .cms-menu-list li a').entwine({
    onclick(e) {
      $('.cms-container').loadFragment('admin/subsite_xhr', 'SubsiteList');
      this._super(e);
    }
  });

  /*
   * Reload subsites dropdown when the admin area reloads (for deleting sites)
   */
  $('.cms-container .SubsiteAdmin .cms-edit-form fieldset.ss-gridfield').entwine({
    onreload(e) {
      $('.cms-container').loadFragment('admin/subsite_xhr', 'SubsiteList');
      this._super(e);
    }
  });

  /*
   * Reload subsites dropdown when subsites are added or names are modified
   */
  $('.cms-container .tab.subsite-model').entwine({
    onadd(e) {
      $('.cms-container').loadFragment('admin/subsite_xhr', 'SubsiteList');
      this._super(e);
    }
  });

  // Subsite tab of Group editor
  $('#Form_ItemEditForm_AccessAllSubsites').entwine({
    /**
     * Constructor: onmatch
     */
    onmatch() {
      this.showHideSubsiteList();

      const ref = this;
      $('#Form_ItemEditForm_AccessAllSubsites input').change(() => {
        ref.showHideSubsiteList();
      });
    },

    showHideSubsiteList() {
      $('#Form_ItemEditForm_Subsites').parent().parent().css('display', ($('#Form_ItemEditForm_AccessAllSubsites_1').is(':checked') ? 'none' : ''));
    }
  });

  $('.cms-edit-form').entwine({
    /**
     * TODO: Fix with Entwine API extension. See https://github.com/silverstripe/silverstripe-subsites/pull/125
     */
    getChangeTrackerOptions() {
      // Figure out if we're still returning the default value
      const isDefault = (this.entwineData('ChangeTrackerOptions') === undefined);
      // Get the current options
      let opts = this._super();

      if (isDefault) {
        // If it is the default then...
        // clone the object (so we don't modify the original),
        opts = $.extend({}, opts);
        // modify it,
        opts.ignoreFieldSelector += ', input[name=IsSubsite]';
        // then set the clone as the value on this element
        // (so next call to this method gets this same clone)
        this.setChangeTrackerOptions(opts);
      }

      return opts;
    }
  });

  $('.cms-edit-form input[name=action_copytosubsite]').entwine({
    onclick() {
      const form = this.closest('form');
      form.trigger('submit', [this]);
    }
  });
});

jQuery.entwine('ss.preview', ($) => {
  $('.cms-preview').entwine({

    /**
     * Update links and forms with GET/POST SubsiteID param, so we remaing on the current subsite.
     * The initial link for the iframe comes from SiteTreeSubsites::updatePreviewLink.
     *
     * This is done so we can use the CMS domain for displaying previews so we prevent single-origin
     * violations and SSL cert problems that come up when iframing content from a different URL.
     */
    onafterIframeAdjustedForPreview(event, doc) {
      const subsiteId = $(doc).find('meta[name=x-subsite-id]').attr('content');

      if (!subsiteId) {
        return;
      }

      // Inject the SubsiteID into internal links.
      $(doc).find('a').each(() => {
        const href = $(this).attr('href');

        if (typeof href !== 'undefined' && !href.match(/^http:\/\//)) {
          $(this).attr('href', $.path.addSearchParams(href, {
            SubsiteID: subsiteId
          }));
        }
      });

      // Inject the SubsiteID as a hidden input into all forms submitting to the local site.
      $(doc).find('form').each(() => {
        const action = $(this).attr('action');

        if (typeof action !== 'undefined' && !action.match(/^http:\/\//)) {
          $(this).append(`<input type=hidden name="SubsiteID" value="${subsiteId}" >`);
        }
      });
    }
  });
});
