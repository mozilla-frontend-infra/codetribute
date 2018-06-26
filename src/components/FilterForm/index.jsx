import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { parse, stringify } from 'qs';

@withRouter
export default class FilterForm extends Component {
  getQuery() {
    const { location } = this.props;
    const query = parse(location.search.slice(1));

    return {
      ...query,
      displayAssigned: query.displayAssigned
        ? query.displayAssigned.toLowerCase() === 'true'
        : false,
    };
  }

  handleDisplayAssignedChange = event => {
    this.props.history.push({
      search: `?${stringify({
        ...this.getQuery(),
        displayAssigned: event.target.checked,
      })}`,
    });
  };

  render() {
    const { displayAssigned } = this.getQuery();

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={displayAssigned}
              onChange={this.handleDisplayAssignedChange}
            />
          }
          label="Also display assigned bugs"
        />
      </FormGroup>
    );
  }
}
