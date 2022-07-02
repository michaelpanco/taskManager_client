import { ReactSVG } from 'react-svg';
import moment from 'moment';
interface Props {
    date: string;
    note: string;
    onDelete: () => void;
    onEdit: () => void;
}

export const Task = (props: Props) => {
    const { note, date, onEdit, onDelete } = props;
    return (
        <div className="m-2 card h-full bg-base-100 border border-slate-200">
            <div className="card-body p-4 ">
                <div className="flex justify-end">
                    <div className="w-2/3">
                        <div className="text-xs text-slate-400 pt-1">{moment(date).format('MMMM D, YYYY h:mm a')}</div>
                    </div>
                    <div className="w-1/3 flex justify-end">
                        <ReactSVG
                            className="icon edit-task-icon"
                            src={`/assets/icons/edit3.svg`}
                            onClick={onEdit}
                            beforeInjection={(svg) => {
                                svg.setAttribute('style', 'width:26px;margin-right:10px');
                            }}
                        />
                        <ReactSVG
                            className="icon delete-task-icon"
                            src={`/assets/icons/close2.svg`}
                            onClick={onDelete}
                            beforeInjection={(svg) => {
                                svg.setAttribute('style', 'width:16px;margin-right:10px');
                            }}
                        />
                    </div>
                </div>
                <p>{note}</p>
            </div>
        </div>
    );
};
