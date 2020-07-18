import Vue from 'vue';
import FxTable from 'fx-table';
import 'fx-table/lib/fx-table.min.css';

Vue.use(FxTable, {
    defaultOptions: {
        resHandler(res) {
            return res;
        }
    }
});