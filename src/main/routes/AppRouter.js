import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import AdminRouter from '../../admin/routes/AdminRouter';
import TeacherRouter from '../../teacher/routes/TeacherRouter';
import AdminRouterPrivate from './AdminRouterPrivate';
import TeacherRouterPrivate from './TeacherRouterPrivate';
import PublicRouter from './PublicRouter';
import { Login } from '../pages/Login';

export const AppRouter = () => {
	return (
		<>

			<Routes>
				<Route path="/" element={
					<PublicRouter>
						<Login />
					</PublicRouter>} />

				<Route path="/docente/*" element={
					<TeacherRouterPrivate>
						<TeacherRouter />
					</TeacherRouterPrivate>} />

				<Route path="/admin/*" element={
					<AdminRouterPrivate >
						<AdminRouter />
					</AdminRouterPrivate>} />

				<Route path="/*" element={<PageNotFound/>} />
			</Routes>


		</>
	);
};
