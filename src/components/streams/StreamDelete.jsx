import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <>
        <button 
          className="ui negative button"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link href="/">
          <div className="ui button">Cancel</div>
        </Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete stream ${this.props.stream.title}?`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => this.props.history.push('/')}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps, 
  { fetchStream, deleteStream }
)(withRouter(StreamDelete));