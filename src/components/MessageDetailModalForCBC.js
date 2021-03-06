import React from 'react';
import BabyBrithDatePicker from './form/BabyBrithDatePicker';
import Helper from '../utils/helper';

const selector = {
    detailDialog: '#msg-detail-cbc-dialog'
}

export default class MessageDetailModalForCBC extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        
        this.openDialog = MessageDetailModalForCBC.openDialog;
        this.closeDialog = MessageDetailModalForCBC.closeDialog;
    }

    static openDialog(){
        $(selector.detailDialog).modal('show');
    }

    static closeDialog(){
        $(selector.detailDialog).modal('hide');
    }

    onSubmit(e) {
        let updatedMsgItem = Object.assign({}, this.props.msgItem);
        updatedMsgItem.babyName = $(this.babyNameDdl).val();
        updatedMsgItem.birthdate = BabyBrithDatePicker.getBabyBrithDateValue();

        this.props.onMessageSubmission(updatedMsgItem);
        this.closeDialog();
    }

    componentDidMount(){
        //add default name options
        this.props.babyNameSet.map((babyName) => $(this.babyNameDdl).append($("<option></option>").attr("value", babyName.value).text(babyName.name)));
    }

    render() {
        var dialogSelector = Helper.getSelectorName(selector.detailDialog);

        return (
            <div className="modal fade" id={dialogSelector} data-msg-id="-1" tabIndex="-1" role="dialog" aria-labelledby="message detail dialog for baby birth" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title col-xs-8">Choose baby name and birth date</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-4">
                                <select ref={(input) => this.babyNameDdl = input} className="custom-select form-control"></select>
                            </div>
                            <div className="col-sm-8">
                                <BabyBrithDatePicker />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Process</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

MessageDetailModalForCBC.propTypes = {
  babyNameSet: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  msgItem: React.PropTypes.object,
  onMessageSubmission: React.PropTypes.func.isRequired
};
