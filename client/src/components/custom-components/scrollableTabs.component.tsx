import TabScrollButton from '@material-ui/core/TabScrollButton';
import { withStyles } from '@material-ui/core/styles';

export default withStyles(theme => ({
  root: {
    width: 28,
    overflow: 'hidden',
    transition: 'width 0.5s',
    '&.Mui-disabled': {
      width: 0,
    },
  },
}))(TabScrollButton);


