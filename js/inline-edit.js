function FEInlineEditor (opts) {
    var _this = this;
    _this.opts = {
        element : null
    };
    _this.state = {
        uuid : '',
        active : false,
        value : '',
        history : [],
        save : {
            table : '',
            column : '',
            id : 0
        }
    };

    _this.init = function(opts, scope){
        scope.opts = Object.assign(scope.opts, opts || {});
        scope.state.uuid = _this.UUID.v4();

    };

    _this.extractData = function(){
        var data = _this.opts.element.data();

        if(!data.feieTable || data.feieTable || data.feieId){
            throw new DOMException('missing data fields data-feie-table, data-feie-table, data-feie-id');
        }

        _this.state.save.table = data.feieTable;
        _this.state.save.column = data.feieColumn;
        _this.state.save.column = data.feieId;
    }

    _this.UUID = {
        v4 : function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        }
    }

    _this.init(opts, _this);
}

FEInlineEditor.initialize = function(opts){
    var fie,
    editors = $(opts.selector.join(', '));
    editors.each(function(element){
        fie = element.data('FEInlineEditor');
        if(!fie) {
            element.data('FEInlineEditor', new FEInlineEditor({
                element : element
            }));
        }
    });

    return editors.map(function(element){
        return element.data('FEInlineEditor');
    });
}

(function($) {

    FEInlineEditor.initialize({
        selector : ['h1','h2','h3','h4','h5','p'],
        replacements : [
            [/\n/g, '<br/>']
        ]
    });

})(jQuery);