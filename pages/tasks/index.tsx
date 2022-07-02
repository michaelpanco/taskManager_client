import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch } from '../../app/hooks';
import DashboardLayout from '../../components/layouts/Dashboard';
import { Task } from '../../components/partials/Task';
import { listsTasks, deleteTask } from '../../services/task';
import { ReactSVG } from 'react-svg';
import CreateTask from '../../components/partials/Task/create';
import UpdateTask from '../../components/partials/Task/details';
const Tasks: NextPage = () => {
    const dispatch = useAppDispatch();

    const [tasks, setTasks] = useState([]);
    const [fetchingTasks, setFetchingTasks] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');

    const callListsTasks = async () => {
        setFetchingTasks(true);
        try {
            const params = {};
            let response: any = await dispatch(listsTasks(params));

            if (response.type === 'task/lists/fulfilled') {
                setFetchingTasks(false);
                setTasks(response.payload.data);
            }
            if (response.type === 'task/lists/rejected') {
                setFetchingTasks(false);
            }
        } catch (error) {
            setFetchingTasks(false);
        }
    };

    const callDeleteTask = async () => {
        try {
            const params = {
                id: selectedTask
            };
            let response: any = await dispatch(deleteTask(params));

            if (response.type === 'task/delete/fulfilled') {
                callListsTasks();
                setDeleteOpen(false);
            }
            if (response.type === 'task/delete/rejected') {
            }
        } catch (error) {}
    };

    useEffect(() => {
        callListsTasks();
    }, []);

    const openDeleteTask = (id: string) => {
        setSelectedTask(id);
        setDeleteOpen(true);
    };
    const openCreateTask = () => {
        setCreateOpen(true);
    };

    const closeCreateTask = () => {
        setCreateOpen(false);
    };

    const onCreateTaskSuccess = () => {
        setCreateOpen(false);
        callListsTasks();
    };

    const onUpdateTaskSuccess = () => {
        setDetailsOpen(false);
        callListsTasks();
    };

    const openRetrieveTask = (id: string) => {
        setSelectedTask(id);
        setDetailsOpen(true);
    };

    const closeRetrieveTask = () => {
        setDetailsOpen(false);
    };

    const taskLists = tasks.map((task: any) => {
        return (
            <div key={task.id} className="w-1/3 mb-5">
                <Task onDelete={() => openDeleteTask(task.id)} onEdit={() => openRetrieveTask(task.id)} date={task.dateTime} note={task.note} />
            </div>
        );
    });

    return (
        <DashboardLayout>
            <Head>
                <title>All Tasks</title>
            </Head>

            <div className="flex justify-end mb-3">
                <div className="flex items-center cursor-pointer hover:text-pink-500" onClick={openCreateTask}>
                    <ReactSVG
                        className="icon edit-task-icon"
                        src={`/assets/icons/plus.svg`}
                        beforeInjection={(svg) => {
                            svg.setAttribute('style', 'width:13px;margin-right:10px');
                        }}
                    />
                    Create new task
                </div>
            </div>

            {fetchingTasks ? (
                <>Loading you tasks. please wait...</>
            ) : (
                <>
                    <div className="flex flex-wrap">{taskLists}</div>
                    {tasks.length < 1 && <div className="text-center font-bold">You do not have any task yet.</div>}
                </>
            )}

            <div className={`modal ${deleteOpen && 'modal-open'}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm deletion</h3>
                    <p className="py-4">Are you sure you want to delete this task?</p>
                    <div className="modal-action">
                        <a href="#" className="btn btn-primary" onClick={callDeleteTask}>
                            Yes, Delete it!
                        </a>
                        <a href="#" onClick={() => setDeleteOpen(false)} className="btn btn-secondary">
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
            <div className={`modal ${createOpen && 'modal-open'} modal-middle`}>
                <div className="modal-box py-10">
                    <div className="flex mb-5">
                        <div className="w-1/2">
                            <div className="flex items-center cursor-pointer hover:text-pink-500" onClick={openCreateTask}>
                                <ReactSVG
                                    className="icon edit-task-icon"
                                    src={`/assets/icons/plus.svg`}
                                    beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'width:20px;margin-right:10px');
                                    }}
                                />
                                <h3 className="font-bold text-lg">Create a Task</h3>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <ReactSVG
                                className="icon edit-task-icon cursor-pointer svg-red"
                                onClick={closeCreateTask}
                                src={`/assets/icons/delete.svg`}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('style', 'width:20px;');
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <CreateTask onSuccess={onCreateTaskSuccess} />
                    </div>
                </div>
            </div>

            <div className={`modal ${detailsOpen && 'modal-open'} modal-middle`}>
                <div className="modal-box py-10">
                    <div className="flex mb-5">
                        <div className="w-1/2">
                            <div className="flex items-center cursor-pointer hover:text-pink-500" onClick={openCreateTask}>
                                <ReactSVG
                                    className="icon edit-task-icon"
                                    src={`/assets/icons/edit2.svg`}
                                    beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'width:20px;margin-right:10px');
                                    }}
                                />
                                <h3 className="font-bold text-lg">Your task details</h3>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <ReactSVG
                                className="icon edit-task-icon cursor-pointer svg-red"
                                onClick={closeRetrieveTask}
                                src={`/assets/icons/delete.svg`}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('style', 'width:20px;');
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <UpdateTask id={selectedTask} onSuccess={onUpdateTaskSuccess} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Tasks;
