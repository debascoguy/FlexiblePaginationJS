/**
 * @Created By: Ademola Aina
 * @Email:  aina.ademolac@gmail.com
 * @Year :  2018 Production
 *
 * DOCUMENTATION:
 * ==============
 * www.noahsarkeducation.com/code-lab/js/flexible-pagination
 *
 * LICENSE:
 * ========
 *
 * TERMS OF USE - Flexible Pagination
 *
 * Open source under the BSD License.
 *
 * Copyright © 2018 Ademola Aina
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var Flexible = (typeof Flexible === 'undefined') ? {} : Flexible;

Flexible.Pagination = function(options){

    var pager = this, defaultOption = {};
    defaultOption.pagingControlsContainer = "#pagingControls";
    defaultOption.pagingContainer = "#content";
    defaultOption.itemSelector = ".item:visible"; //A Filtered Visible Paragraphs
    defaultOption.itemsPerPageSelector = ".itemPerPageDropDown"; //Paragraphs Per Page
    defaultOption.itemsPerPage = 1;
    defaultOption.currentPage = 1;
    defaultOption.searchBoxSelector = '.searchBox';
    defaultOption.searchPhrase = '';
    defaultOption.showingInfoSelector = '.showingInfo';
    /** How many Page Number should be visible while navigating. Minimum allowed is 3  (previous, current & next) */
    defaultOption.displayedPages = 10;
    /**Show / Hide Control Buttons : Default to TRUE */
    defaultOption.showGotoFirst = true;
    defaultOption.showGotoLast = true;
    defaultOption.showPrevious = true;
    defaultOption.showNext = true;
    /** all Text can accept an icon using a <span> OR <i> tag. */
    defaultOption.btnFirstText = "<<";
    defaultOption.btnLastText = ">>";
    defaultOption.btnNextText = ">";
    defaultOption.btnPreviousText = "<";
    /**CSS properties */
    defaultOption.css = {};
    defaultOption.css.paginationLayout = "<style> " +
                                            defaultOption.pagingControlsContainer+" ul{display:inline; padding-left: 0.2em} " +
                                            defaultOption.pagingControlsContainer+" li{display:inline; padding-left: 0.2em}" +
                                        "</style>";
    defaultOption.css.btnNumberingClass = "btn btn-sm btn-primary";
    defaultOption.css.btnActiveClass = "btn btn-sm btn-default";
    defaultOption.css.btnFirstClass = defaultOption.css.btnNumberingClass;
    defaultOption.css.btnLastClass = defaultOption.css.btnNumberingClass;
    defaultOption.css.btnNextClass = defaultOption.css.btnNumberingClass;
    defaultOption.css.btnPreviousClass = defaultOption.css.btnNumberingClass;
    /**@Advanced Implementation default using a custom Json Data Source */
    defaultOption.dataSource = {};
    /**@Using_Ajax as DataSource */
    defaultOption.ajax = {};
    defaultOption.ajax.params = {};
    defaultOption.ajax.url = '';
    defaultOption.ajax.onSuccessCallBack = function(response){
        console.log(response);
        return response;
    };
    defaultOption.ajax.onFailureCallBack = function(error){
        alert("Ajax Error  - See Console for details!");
        console.log(error);
    };

    if (typeof options === 'undefined') {
        options = defaultOption;
    }

    var getOption = function(field){
        return (typeof options[field] === 'undefined') ? defaultOption[field] : options[field];
    };

    var getAjaxOption = function(ajaxFieldName){
        var value = getOption('ajax'), defaultValue = defaultOption['ajax'];
        return (typeof value[ajaxFieldName] === 'undefined') ? defaultValue[ajaxFieldName] : value[ajaxFieldName];
    };

    var getCssOption = function(cssFieldName){
        var value = getOption('css'), defaultValue = defaultOption['css'];
        return (typeof value[cssFieldName] === 'undefined') ? defaultValue[cssFieldName] : value[cssFieldName];
    };

    this.itemsPerPageSelector = getOption('itemsPerPageSelector');
    this.itemsPerPage = getOption('itemsPerPage');
    this.currentPage = getOption('currentPage');
    this.pagingControlsContainer = getOption('pagingControlsContainer');
    this.pagingContainer = getOption('pagingContainer');
    this.itemSelector = getOption('itemSelector');
    this.showingInfoSelector = getOption('showingInfoSelector');
    this.displayedPages = getOption('displayedPages');
    this.numOfPages = 0;
    this.searchBoxSelector = getOption('searchBoxSelector');
    this.searchPhrase = getOption('searchPhrase');
    this.showGotoFirst = getOption('showGotoFirst');
    this.showGotoLast = getOption('showGotoLast');
    this.showPrevious = getOption('showPrevious');
    this.showNext = getOption('showNext');
    this.btnFirstText = getOption('btnFirstText');
    this.btnLastText = getOption('btnLastText');
    this.btnPreviousText = getOption('btnPreviousText');
    this.btnNextText = getOption('btnNextText');
    this.dataSource = getOption('dataSource');
    this.ajax = getOption('ajax');
    this.ajax.params = getAjaxOption('params');
    this.ajax.url = getAjaxOption('url');
    this.ajax.onSuccessCallBack = getAjaxOption("onSuccessCallBack");
    this.ajax.onFailureCallBack = getAjaxOption("onFailureCallBack");
    this.css = getOption('css');
    this.css.paginationLayout = getCssOption('paginationLayout');
    this.css.btnNumberingClass = getCssOption('btnNumberingClass');
    this.css.btnActiveClass = getCssOption('btnActiveClass');
    this.css.btnFirstClass = getCssOption('btnFirstClass');
    this.css.btnLastClass = getCssOption('btnLastClass');
    this.css.btnNextClass = getCssOption('btnNextClass');
    this.css.btnPreviousClass = getCssOption('btnPreviousClass');

    this.css.paginationLayout = "<style> " +
                                    this.pagingControlsContainer+" ul{display:inline; padding-left: 0.2em} " +
                                    this.pagingControlsContainer+" li{display:inline; padding-left: 0.2em}" +
                                "</style>";

    /**Private Property Below */
    this.instanceId = Math.floor(Math.random() * 20);
    this.controller = null;


    this.init = function () {
        this.pagingContainer = $(this.pagingContainer);
        this.itemSelector = $(this.itemSelector, this.pagingContainer);
        if (this.displayedPages < 3){
            console.log("Minimum Displayed Page Numbers Allowed While Navigating is 3. " +
                "\nTo avoid pagination control malfunction, please set this to >= 3, even if you have lesser items to display.");
            this.displayedPages = 3;
        }
    };


    this.getController = function(){
        if (this.controller == null) {
            this.init();
            this.controller = new Flexible.PaginationController(this);
        }
        return this.controller;
    };

    /**
     * @search
     * @param trString
     * @param words
     * @returns {boolean}
     */
    this.search = function(trString, words){
        for (var i = 0; i < words.length; i++) {
            if (trString.indexOf(words[i]) > -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * @getRowData
     * @returns {*}
     */
    this.getData = function(){
        var words = pager.searchPhrase.toLowerCase().split(" "), dataSource = pager.itemSelector;
        if (pager.dataSource.length > 0){
            /**@Advanced Implementation Using a Custom Json Data Source */
            dataSource = pager.dataSource;
        }
        if (pager.searchPhrase.length > 0){
            /**@Filter By Search Phrase */
            return dataSource.filter(function(key, value){
                return pager.search($(value).html().replace(/<[^>]+>/g,"").toLowerCase(), words);
            });
        }
        /**@NoFilter */
        return dataSource;
    };


    this.showingInfoHandler = function(start, end, totalItems){
        if ($(pager.showingInfoSelector)[0]){
            $(pager.showingInfoSelector).html("Showing "+(totalItems > 0 ? start+1 : 0)+' to '+
                (end > totalItems ? totalItems : end)+' of '+totalItems+' Entries'
            );
        }
    };


    /**
     * @showCurrentPage
     */
    this.showCurrentPage = function(){
        if (pager.controller == null) {
            pager.init();
        }
        var html = '', start = 0, end = 'all', totalItems = 0;
        if (pager.itemsPerPage != 'all'){
            start = (pager.currentPage-1) * this.itemsPerPage;
            end = start+pager.itemsPerPage;
        }

        if (this.ajax.url != '' && this.ajax.url!='undefined'){
            totalItems = end-start;
            /**@Ajax Implementation */
            var request_params = {status:true, search: pager.searchPhrase, currentPage:pager.currentPage, start:start, end:end, totalItems:totalItems};
            pager.ajax.params = $.extend(this.ajax.params, request_params);
            $.post(pager.ajax.url, pager.ajax.params, function(response){
                html = pager.ajax.onSuccessCallBack(response);
                if (pager.itemsPerPage == 'all'){
                    pager.itemsPerPage = response.totalItems;
                }
                totalItems = response.totalItems;
                start = (pager.currentPage-1) * pager.itemsPerPage;
                end = start+pager.itemsPerPage;
                pager.pagingContainer.html(html);
                pager.showingInfoHandler(start, end, totalItems);
            }, 'json').fail(pager.ajax.onFailureCallBack);
        }
        else{
            /**@Basic_OR_Advanced Implementation */
            var data = pager.getData(); totalItems = data.length;
            if (pager.itemsPerPage=='all'){
                pager.itemsPerPage = totalItems;
                start = (pager.currentPage-1) * this.itemsPerPage;
                end = start+pager.itemsPerPage;
            }
            data.slice(start, end).each(function(){ html += this.outerHTML; });
            pager.pagingContainer.html(html);
            pager.showingInfoHandler(start, end, totalItems);
        }

        $(pager.pagingControlsContainer).html('');
        pager.numOfPages = 0;
        if (totalItems > pager.itemsPerPage){
            /** Auto-Calculate the number of Pages. */
            pager.numOfPages = Math.ceil(totalItems / pager.itemsPerPage);
            /**@render Pagination Controls */
            pager.renderControls();
        }
    };


    var createButton = function (Label, btnClasses, isDisabled) {
        return '<li><a href="javascript:void();" class="'+btnClasses+' '+(isDisabled ? "disabled" : "")+'">'+Label+'</a></li>';
    };

    /**
     * @renderControls
     */
    this.renderControls = function () {
        var container = this.pagingControlsContainer,
            currentPage = this.currentPage,
            numPages = this.numOfPages,
            displayedPages = this.displayedPages;   //How many Page Number should be visible while navigating

        var pagingControls = this.css.paginationLayout + "<ul>";

        if (this.showGotoFirst){
            pagingControls += createButton(this.btnFirstText, 'se-first'+this.instanceId+' '+this.css.btnFirstClass, currentPage==1);
        }
        if (this.showPrevious){
            pagingControls += createButton(this.btnPreviousText, 'se-prev'+this.instanceId+' '+this.css.btnPreviousClass, currentPage==1);
        }

        var starting = 1, upTo = numPages-2, secondToLastPage = numPages-1, lastPage = numPages,
            maximumStartingPoint = (numPages - displayedPages)+1;
        if (displayedPages < numPages) {
            upTo = displayedPages - 2;
            if (currentPage > upTo) {
                //Shift one down to allow the visibility of currently active page.
                starting += (currentPage-upTo);
                upTo += (currentPage-upTo);
                if (starting > maximumStartingPoint){
                    //Normalize any escalating starting points...and subsequently upTo
                    starting = maximumStartingPoint;
                    upTo = secondToLastPage-1;
                }
            }
        }

        while(starting <= upTo){
            if (starting != currentPage){
                pagingControls += createButton(starting, 'se-page-num'+this.instanceId+' '+this.css.btnNumberingClass, false);
            }
            else{
                pagingControls += createButton(starting, 'se-active-page'+this.instanceId+' '+this.css.btnActiveClass, false);
            }
            starting++;
        }

        if ( starting != (numPages-1)){
            pagingControls += createButton('...', 'se-page-num'+this.instanceId+' '+this.css.btnActiveClass, true);
        }

        if (secondToLastPage==currentPage){
            pagingControls += createButton(secondToLastPage, 'se-active-page'+this.instanceId+' '+this.css.btnActiveClass, false);
        }
        else{
            pagingControls += createButton(secondToLastPage, 'se-page-num'+this.instanceId+' '+this.css.btnNumberingClass, false);
        }

        if (lastPage==currentPage){
            pagingControls += createButton(lastPage, 'se-active-page'+this.instanceId+' '+this.css.btnActiveClass, false);
        }
        else{
            pagingControls += createButton(lastPage, 'se-page-num'+this.instanceId+' '+this.css.btnNumberingClass, false);
        }

        if (this.showNext){
            pagingControls += createButton(this.btnNextText, 'se-next'+this.instanceId+' '+this.css.btnNextClass, currentPage==numPages);
        }
        if (this.showGotoLast){
            pagingControls += createButton(this.btnLastText, 'se-last'+this.instanceId+' '+this.css.btnLastClass, currentPage==numPages);
        }
        pagingControls += '</ul>';

        $(container).html(pagingControls);
        if (this.controller == null){
            this.controller = new Flexible.PaginationController(this);
        }
    };


};


/**
 * @Flexible.PaginationController
 * @param pager
 * @constructor
 */
Flexible.PaginationController = function(pager){

    var body = $('body'), controller = this, instanceId = pager.instanceId;

    /**
     * @showPage
     * @param page
     */
    controller.showPage = function(page){
        pager.currentPage = page;
        pager.showCurrentPage();
        return pager.currentPage;
    };

    /**
     * @returns {number}
     */
    controller.showFirstPage = function() {
        return controller.showPage(1);
    };

    /**
     * @returns {number|*}
     */
    controller.showLastPage = function() {
        return controller.showPage(pager.numOfPages);
    };

    /**
     * @returns {number|*}
     */
    controller.showPreviousPage = function(){
        return controller.showPage(parseInt(body.find('.se-active-page'+instanceId).html())-1);
    };

    /**
     * @returns {number|*}
     */
    controller.showNextPage = function(){
        return controller.showPage(parseInt(body.find('.se-active-page'+instanceId).html())+1);
    };

    /**
     * @onPageClick
     * @param pageNumber    Optional Parameter
     * @param event         Optional Parameter
     * @returns {boolean}
     */
    controller.onPageClick = function (pageNumber, event) {
        return true;
    };

    /**@search Text field control */
    body.on("keyup", pager.searchBoxSelector, function(e){
        pager.searchPhrase = $(this).val();
        controller.showFirstPage();
    });

    /**@dropDown for selecting Items Per Page */
    body.on("change", pager.itemsPerPageSelector, function(e){
        e.preventDefault();
        pager.itemsPerPage = ($(this).val()=='all') ? $(this).val() : parseInt($(this).val());
        controller.showFirstPage();
    });

    /**@onClick Page Number */
    body.on('click', '.se-page-num'+instanceId, function (e) {
        e.preventDefault();
        var pageNum = parseInt($(this).html());
        controller.showPage(pageNum);
        controller.onPageClick(pageNum, e);
    });

    /**@onClick Previous Button */
    body.on('click', '.se-prev'+instanceId, function (e) {
        e.preventDefault();
        var pageNum = controller.showPreviousPage();
        controller.onPageClick(pageNum, e);
    });

    /**@onClick Next Button */
    body.on('click', '.se-next'+instanceId, function (e) {
        e.preventDefault();
        var pageNum = controller.showNextPage();
        controller.onPageClick(pageNum, e);
    });

    /**@onClick First Button */
    body.on('click', '.se-first'+instanceId, function (e) {
        e.preventDefault();
        var pageNum = controller.showFirstPage();
        controller.onPageClick(pageNum, e);
    });

    /**@onClick Last Button */
    body.on('click', '.se-last'+instanceId, function (e) {
        e.preventDefault();
        var pageNum = controller.showLastPage();
        controller.onPageClick(pageNum, e);
    });

};


(function($) {

    $.fn.flexiblePagination = function (newOptions) {
        return $.flexiblePagination(this, newOptions);
    };

    $.flexiblePagination = function (pagingContainer, newOptions) {
        newOptions['pagingContainer'] = pagingContainer;
        var pager = new Flexible.Pagination(newOptions);
        pager.showCurrentPage();
        return pager;
    };

})(jQuery);

