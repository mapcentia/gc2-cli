/**
 * @author     Martin Høgh <mh@mapcentia.com>
 * @copyright  2013-2024 MapCentia ApS
 * @license    http://www.gnu.org/licenses/#AGPL  GNU AFFERO GENERAL PUBLIC LICENSE 3
 *
 */

export interface ApiResponse {
  readonly success: boolean;
  readonly data?: any;
  readonly message: string;
  readonly _execution_time: number;
}
