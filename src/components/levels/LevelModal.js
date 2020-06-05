import React from 'react';
import { pointsToLevels } from "../../levels";
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

const LevelModal = ({ points, handleClose, show }) => {
    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Body>
                <div className="text-center">
                    <h2>You're a {pointsToLevels(points).title}!</h2>
                    <br />
                    <div className="container">
                        {/* TODO: Badge goes here */}
                    </div>
                    <br />
                    <button className="btn btn-dark"><i class="fa fa-instagram"></i>&nbsp;Share your badge</button><br /><br />
                    <button className="btn btn-info" onClick={handleClose}>Back to Home</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        points: state.pointsData.points
    };
};

export default connect(mapStateToProps)(LevelModal);