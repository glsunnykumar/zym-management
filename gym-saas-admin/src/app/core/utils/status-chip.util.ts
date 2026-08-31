import { StatusChipConfig } from '../../ui/models/status-chip.model';
import { MembershipStatus } from '../enums';

export class StatusChipUtil {

  static membership(status: MembershipStatus): StatusChipConfig {

    switch (status) {

      case MembershipStatus.ACTIVE:

        return {

          label: 'Active',

          color: 'success',

          icon: 'check_circle'

        };

      case MembershipStatus.EXPIRED:

        return {

          label: 'Expired',

          color: 'danger',

          icon: 'cancel'

        };

      case MembershipStatus.FROZEN:

        return {

          label: 'Frozen',

          color: 'warning',

          icon: 'pause_circle'

        };

      default:

        return {

          label: 'Pending',

          color: 'info',

          icon: 'schedule'

        };

    }

  }

}