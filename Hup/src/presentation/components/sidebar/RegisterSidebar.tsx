import React from 'react';
import { Icons } from '@/assets/icons/Icons';
const RegisterSidebar = () => {
	return (
		<aside className='sidebar'>
			<section>
				<h1>Welcome to SmarDac!</h1>
				<p>
					Get involved in new opportunities with global clients, including large corporations, tech
					leaders, <br /> startups, and others.
				</p>
				<div className='feature'>
					<div>
						<Icons.global width={48} />
					</div>
					<span>
						Experience the flexibility of remote work, whether it&apos;s full-time, part-time, or
						hourly, from anywhere.
					</span>
				</div>
				<div className='feature'>
					<div>
						<Icons.people width={48} />
					</div>
					<span>
						Receive tailored job opportunities, aligned with your skills, directly within the
						network.
					</span>
				</div>
				<div className='feature'>
					<div>
						<Icons.briefcase width={48} />
					</div>
					<span>Join a global community of experts, offering support and mentorship.</span>
				</div>
				<div className='feature'>
					<div>
						<Icons.shieldTick width={48} />
					</div>
					<span>
						Gain instant trust and credibility within our reputable community from day one.
					</span>
				</div>
			</section>
		</aside>
	);
};

export default RegisterSidebar;
