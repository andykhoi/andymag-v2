import Image from 'next/image'
import { FC } from 'react'
import { useFormatting } from '../../context/FormattingContextProvider'

export interface PodcastCoverProps {
	coverSrc: string,
	coverAlt: string
}

export const PodcastCover: FC<PodcastCoverProps> = ({
	coverSrc,
	coverAlt
}) => {
	const { fontFamilies, defaultPadding } = useFormatting()

	return (
			<div className="cover">
				{/* think about how to make this customizable */}
				<div className='dafna-title'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 149" fill="none">
						<path d="M13.9522 18.954C13.9522 19.01 13.9102 19.038 13.8262 19.038C12.9582 19.178 12.0482 19.29 11.0962 19.374C10.1722 19.43 9.29017 19.528 8.45017 19.668H8.40817C8.26817 21.432 8.18417 23.196 8.15617 24.96C8.12817 26.696 8.10017 28.362 8.07217 29.958C7.51217 30.014 6.84017 30.056 6.05617 30.084C5.30017 30.112 4.54417 30.126 3.78817 30.126C3.03217 30.126 2.36017 30.112 1.77217 30.084C1.21217 30.056 0.876168 30.014 0.764168 29.958L0.722168 29.916C0.722168 28.236 0.722168 26.668 0.722168 25.212C0.722168 23.728 0.722168 22.3 0.722168 20.928C0.750168 19.556 0.764168 18.184 0.764168 16.812C0.764168 15.412 0.764168 13.942 0.764168 12.402C0.792168 10.862 0.806168 9.21001 0.806168 7.44601C0.806168 5.65401 0.806168 3.66601 0.806168 1.48201V1.44001C1.28217 1.35601 1.96817 1.27201 2.86417 1.18801C3.76017 1.10401 4.76817 1.02001 5.88817 0.936007C7.03617 0.852007 8.24017 0.796007 9.50017 0.768007C10.7882 0.712008 12.0482 0.698008 13.2802 0.726008C14.5122 0.726008 15.6742 0.782008 16.7662 0.894008C17.8582 1.00601 18.7962 1.16001 19.5802 1.35601C19.5802 1.72001 19.5802 2.18201 19.5802 2.74201C19.6082 3.30201 19.6222 3.89001 19.6222 4.50601C19.6222 5.09401 19.6222 5.66801 19.6222 6.22801C19.6222 6.76001 19.6082 7.20801 19.5802 7.57201C18.8242 7.62801 17.9702 7.68401 17.0182 7.74001C16.0942 7.79601 15.1282 7.85201 14.1202 7.90801C13.1402 7.93601 12.1462 7.97801 11.1382 8.03401C10.1582 8.09001 9.23417 8.16001 8.36617 8.24401C8.05817 8.97201 7.93217 9.67201 7.98817 10.344C8.04417 11.016 8.19817 11.576 8.45017 12.024C8.47817 12.052 8.50617 12.066 8.53417 12.066C8.92617 12.122 9.36017 12.164 9.83617 12.192C10.3402 12.192 10.8302 12.192 11.3062 12.192C11.7822 12.192 12.2442 12.178 12.6922 12.15C13.1402 12.122 13.5182 12.094 13.8262 12.066C13.9102 12.262 13.9522 12.64 13.9522 13.2C13.9802 13.76 13.9802 14.39 13.9522 15.09C13.9242 15.762 13.8962 16.448 13.8682 17.148C13.8682 17.848 13.8962 18.45 13.9522 18.954Z" fill="#F32585"/>
						<path d="M46.5813 25.422C46.5813 25.702 46.5953 25.954 46.6233 26.178C46.6793 27.186 46.7073 27.956 46.7073 28.488C46.7073 28.992 46.6653 29.37 46.5813 29.622C46.5253 29.846 46.4133 29.972 46.2453 30C46.0773 30 45.8393 30 45.5313 30C45.2233 29.972 44.8173 29.972 44.3133 30C43.8373 30.028 43.0113 30.056 41.8353 30.084C40.6873 30.112 39.0913 30.126 37.0473 30.126C35.0313 30.126 32.3293 30.098 28.9413 30.042V29.286C29.0253 27.186 29.0953 25.296 29.1513 23.616C29.2073 21.908 29.2353 20.326 29.2353 18.87C29.2633 17.386 29.2773 15.958 29.2773 14.586C29.2773 13.214 29.2633 11.814 29.2353 10.386C29.2073 8.95801 29.1793 7.44601 29.1513 5.85001C29.1233 4.22601 29.0953 2.43401 29.0673 0.474008C29.3473 0.362008 29.7813 0.278008 30.3693 0.222007C30.9573 0.138008 31.5873 0.0960083 32.2593 0.0960083C32.9313 0.0960083 33.5893 0.138008 34.2333 0.222007C34.8773 0.306007 35.3953 0.432007 35.7873 0.600007C35.7313 2.42001 35.7033 4.29601 35.7033 6.22801C35.7313 8.13201 35.7593 10.05 35.7873 11.982C35.8153 13.914 35.8293 15.846 35.8293 17.778C35.8573 19.682 35.8573 21.53 35.8293 23.322V23.364C36.0253 23.308 36.3893 23.294 36.9213 23.322C37.4813 23.322 38.1253 23.336 38.8533 23.364C39.5813 23.392 40.3513 23.434 41.1633 23.49C42.0033 23.518 42.7873 23.546 43.5153 23.574C44.2713 23.602 44.9293 23.63 45.4893 23.658C46.0773 23.658 46.4833 23.644 46.7073 23.616C46.7073 23.924 46.6933 24.232 46.6653 24.54C46.6373 24.82 46.6093 25.114 46.5813 25.422Z" fill="#F32585"/>
						<path d="M68.3659 24.246C70.1579 24.33 72.0059 24.344 73.9099 24.288V24.372C73.9659 25.268 73.9799 26.206 73.9519 27.186C73.9239 28.138 73.7979 29.034 73.5739 29.874C70.7179 29.846 67.8059 29.888 64.8379 30C61.8979 30.084 59.0699 30.014 56.3539 29.79C56.3539 27.354 56.3259 24.946 56.2699 22.566C56.2139 20.158 56.1719 17.764 56.1439 15.384C56.1159 13.004 56.1159 10.624 56.1439 8.24401C56.1719 5.86401 56.2559 3.47001 56.3959 1.06201C57.4879 1.00601 58.6639 0.964007 59.9239 0.936007C61.2119 0.880008 62.4999 0.838008 63.7879 0.810007C65.0759 0.782007 66.3219 0.754007 67.5259 0.726008C68.7299 0.698008 69.7939 0.684008 70.7179 0.684008C71.6419 0.684008 72.3839 0.698008 72.9439 0.726008C73.5039 0.754007 73.7839 0.782007 73.7839 0.810007C73.9239 1.79001 73.9519 2.78401 73.8679 3.79201C73.8119 4.80001 73.7839 5.79401 73.7839 6.77401V6.81601C72.8879 7.01201 71.9779 7.13801 71.0539 7.19401C70.1579 7.22201 69.2479 7.23601 68.3239 7.23601C67.3999 7.20801 66.4759 7.19401 65.5519 7.19401C64.6279 7.19401 63.7039 7.23601 62.7799 7.32001H62.6539L62.6119 7.36201C62.6399 8.17401 62.5979 9.01401 62.4859 9.88201C62.4019 10.722 62.4579 11.52 62.6539 12.276L62.6959 12.318C63.5359 12.374 64.3899 12.402 65.2579 12.402C66.1259 12.402 66.9939 12.416 67.8619 12.444V12.486C68.0019 13.438 68.0439 14.39 67.9879 15.342C67.9319 16.294 67.9179 17.288 67.9459 18.324C67.5259 18.436 67.0499 18.506 66.5179 18.534C65.9859 18.534 65.4679 18.534 64.9639 18.534C64.4879 18.534 64.0539 18.548 63.6619 18.576C63.2699 18.604 63.0039 18.674 62.8639 18.786C62.7239 19.598 62.6679 20.508 62.6959 21.516C62.7519 22.524 62.8079 23.364 62.8639 24.036L62.9059 24.078C64.7539 24.078 66.5739 24.134 68.3659 24.246Z" fill="#F32585"/>
						<path d="M96.2619 24.246C98.0539 24.33 99.9019 24.344 101.806 24.288V24.372C101.862 25.268 101.876 26.206 101.848 27.186C101.82 28.138 101.694 29.034 101.47 29.874C98.6139 29.846 95.7019 29.888 92.7339 30C89.7939 30.084 86.9659 30.014 84.2499 29.79C84.2499 27.354 84.2219 24.946 84.1659 22.566C84.1099 20.158 84.0679 17.764 84.0399 15.384C84.0119 13.004 84.0119 10.624 84.0399 8.24401C84.0679 5.86401 84.1519 3.47001 84.2919 1.06201C85.3839 1.00601 86.5599 0.964007 87.8199 0.936007C89.1079 0.880008 90.3959 0.838008 91.6839 0.810007C92.9719 0.782007 94.2179 0.754007 95.4219 0.726008C96.6259 0.698008 97.6899 0.684008 98.6139 0.684008C99.5379 0.684008 100.28 0.698008 100.84 0.726008C101.4 0.754007 101.68 0.782007 101.68 0.810007C101.82 1.79001 101.848 2.78401 101.764 3.79201C101.708 4.80001 101.68 5.79401 101.68 6.77401V6.81601C100.784 7.01201 99.8739 7.13801 98.9499 7.19401C98.0539 7.22201 97.1439 7.23601 96.2199 7.23601C95.2959 7.20801 94.3719 7.19401 93.4479 7.19401C92.5239 7.19401 91.5999 7.23601 90.6759 7.32001H90.5499L90.5079 7.36201C90.5359 8.17401 90.4939 9.01401 90.3819 9.88201C90.2979 10.722 90.3539 11.52 90.5499 12.276L90.5919 12.318C91.4319 12.374 92.2859 12.402 93.1539 12.402C94.0219 12.402 94.8899 12.416 95.7579 12.444V12.486C95.8979 13.438 95.9399 14.39 95.8839 15.342C95.8279 16.294 95.8139 17.288 95.8419 18.324C95.4219 18.436 94.9459 18.506 94.4139 18.534C93.8819 18.534 93.3639 18.534 92.8599 18.534C92.3839 18.534 91.9499 18.548 91.5579 18.576C91.1659 18.604 90.8999 18.674 90.7599 18.786C90.6199 19.598 90.5639 20.508 90.5919 21.516C90.6479 22.524 90.7039 23.364 90.7599 24.036L90.8019 24.078C92.6499 24.078 94.4699 24.134 96.2619 24.246Z" fill="#F32585"/>
						<path d="M119.496 0.390007C122.548 0.362007 125.516 0.502007 128.4 0.810007C128.456 1.73401 128.47 2.79801 128.442 4.00201C128.442 5.20601 128.372 6.31201 128.232 7.32001C127.7 7.20801 127.042 7.16601 126.258 7.19401C125.474 7.22201 124.424 7.26401 123.108 7.32001H122.982C122.982 7.34801 122.968 7.37601 122.94 7.40401C122.94 7.40401 122.94 7.41801 122.94 7.44601C122.912 7.58601 122.884 7.81001 122.856 8.11801C122.856 8.39801 122.856 8.86001 122.856 9.50401C122.856 10.12 122.856 10.946 122.856 11.982C122.884 12.99 122.912 14.306 122.94 15.93C122.968 17.526 122.996 19.458 123.024 21.726C123.052 23.966 123.094 26.612 123.15 29.664V29.748C122.646 29.832 122.086 29.888 121.47 29.916C120.882 29.916 120.28 29.916 119.664 29.916C119.076 29.916 118.488 29.916 117.9 29.916C117.312 29.916 116.766 29.958 116.262 30.042C116.234 29.93 116.234 29.426 116.262 28.53C116.29 27.634 116.304 26.304 116.304 24.54C116.332 22.748 116.318 20.466 116.262 17.694C116.234 14.922 116.136 11.576 115.968 7.65601L115.926 7.61401C115.59 7.44601 115.17 7.34801 114.666 7.32001C114.162 7.26401 113.658 7.23601 113.154 7.23601C112.65 7.20801 112.188 7.19401 111.768 7.19401C111.348 7.19401 111.054 7.16601 110.886 7.11001C110.83 6.99801 110.774 6.71801 110.718 6.27001C110.69 5.82201 110.662 5.29001 110.634 4.67401C110.634 4.03001 110.634 3.34401 110.634 2.61601C110.634 1.88801 110.662 1.18801 110.718 0.516008C110.718 0.488008 110.704 0.474008 110.676 0.474008C110.676 0.474008 110.676 0.460008 110.676 0.432006C113.532 0.404007 116.472 0.390007 119.496 0.390007Z" fill="#F32585"/>
						<path d="M141.97 0.474008C142.642 0.502008 143.608 0.502008 144.868 0.474008H145.876V0.642006C145.876 3.05001 145.834 5.47201 145.75 7.90801C145.694 10.344 145.638 12.794 145.582 15.258C145.554 17.694 145.554 20.13 145.582 22.566C145.61 25.002 145.694 27.41 145.834 29.79C145.61 30.014 145.134 30.14 144.406 30.168C143.706 30.224 142.936 30.238 142.096 30.21C141.284 30.182 140.5 30.14 139.744 30.084C138.988 30.056 138.47 30.084 138.19 30.168C138.386 27.648 138.47 25.114 138.442 22.566C138.414 20.018 138.358 17.498 138.274 15.006C138.218 12.486 138.176 10.008 138.148 7.57201C138.148 5.10801 138.274 2.70001 138.526 0.348008V0.264009C138.666 0.236007 138.932 0.250007 139.324 0.306008C139.744 0.334008 140.052 0.348008 140.248 0.348008C140.752 0.376007 141.326 0.418007 141.97 0.474008Z" fill="#F32585"/>
						<path d="M173.954 30.126C173.758 30.182 173.422 30.21 172.946 30.21C172.386 30.21 171.742 30.168 171.014 30.084C170.286 30.028 169.642 30 169.082 30C168.158 27.928 167.234 25.926 166.31 23.994C165.414 22.034 164.644 20.158 164 18.366L163.58 17.106C163.468 16.798 163.356 16.518 163.244 16.266C163.16 15.986 163.09 15.846 163.034 15.846C163.006 15.846 162.964 16.182 162.908 16.854C162.88 17.526 162.852 18.38 162.824 19.416C162.796 20.452 162.768 21.6 162.74 22.86C162.74 24.12 162.74 25.338 162.74 26.514C162.74 27.158 162.74 27.788 162.74 28.404C162.74 28.992 162.754 29.524 162.782 30C162.474 30.084 162.166 30.14 161.858 30.168C161.55 30.196 161.242 30.21 160.934 30.21C160.262 30.21 159.576 30.168 158.876 30.084C158.204 30 157.546 29.958 156.902 29.958V27.018C156.902 24.358 156.874 21.824 156.818 19.416C156.79 17.008 156.776 14.488 156.776 11.856C156.776 9.92401 156.804 8.02001 156.86 6.14401C156.916 4.24001 157.014 2.39201 157.154 0.600007C157.434 0.544008 157.728 0.502008 158.036 0.474008C158.372 0.446007 158.708 0.432006 159.044 0.432006C159.212 0.432006 159.492 0.446007 159.884 0.474008C160.276 0.474008 160.668 0.502008 161.06 0.558007C161.452 0.586007 161.788 0.628007 162.068 0.684008C162.376 0.740008 162.53 0.796008 162.53 0.852009C162.726 1.35601 162.908 1.77601 163.076 2.11201C163.244 2.44801 163.398 2.77001 163.538 3.07801C163.706 3.38601 163.874 3.73601 164.042 4.12801C164.238 4.49201 164.462 4.96801 164.714 5.55601C164.77 5.69601 164.896 5.96201 165.092 6.35401C165.288 6.74601 165.512 7.20801 165.764 7.74001C166.016 8.24401 166.282 8.79001 166.562 9.37801C166.842 9.93801 167.094 10.456 167.318 10.932C167.57 11.38 167.78 11.772 167.948 12.108C168.116 12.416 168.214 12.57 168.242 12.57C168.326 12.514 168.396 12.234 168.452 11.73C168.508 11.226 168.536 10.736 168.536 10.26C168.536 9.14001 168.508 8.10401 168.452 7.15201C168.424 6.17201 168.41 5.17801 168.41 4.17001C168.41 3.58201 168.41 2.99401 168.41 2.40601C168.438 1.79001 168.466 1.13201 168.494 0.432006C169.446 0.264007 170.454 0.180007 171.518 0.180007C172.554 0.180007 173.478 0.264007 174.29 0.432006V13.956C174.318 15.132 174.332 16.322 174.332 17.526C174.332 18.73 174.332 19.934 174.332 21.138C174.332 21.95 174.318 22.734 174.29 23.49C174.29 24.246 174.29 25.016 174.29 25.8C174.29 26.36 174.29 26.92 174.29 27.48C174.318 28.04 174.332 28.6 174.332 29.16V30C174.276 30.028 174.15 30.07 173.954 30.126Z" fill="#F32585"/>
						<path d="M193.853 15.426C193.853 15.426 193.881 15.412 193.937 15.384C194.301 15.16 194.889 15.034 195.701 15.006C196.541 14.95 197.423 14.936 198.347 14.964C199.271 14.992 200.125 15.048 200.909 15.132C201.721 15.188 202.267 15.216 202.547 15.216H202.631L202.673 15.258C202.841 16.742 202.953 18.324 203.009 20.004C203.065 21.656 202.953 23.238 202.673 24.75C202.533 26.178 202.099 27.27 201.371 28.026C200.643 28.782 199.747 29.356 198.683 29.748C197.983 29.944 197.255 30.112 196.499 30.252C195.743 30.42 194.973 30.532 194.189 30.588C193.405 30.672 192.635 30.672 191.879 30.588C191.151 30.504 190.451 30.322 189.779 30.042C188.659 29.566 187.805 28.922 187.217 28.11C186.629 27.298 186.167 26.29 185.831 25.086C185.747 24.778 185.649 24.358 185.537 23.826C185.453 23.266 185.383 22.706 185.327 22.146C185.243 21.25 185.173 20.438 185.117 19.71C185.061 18.982 185.005 18.268 184.949 17.568C184.921 16.84 184.893 16.084 184.865 15.3C184.865 14.488 184.879 13.564 184.907 12.528C184.935 11.632 184.977 10.722 185.033 9.79801C185.089 8.84601 185.187 7.92201 185.327 7.02601C185.467 6.10201 185.705 5.20601 186.041 4.33801C186.405 3.47001 186.993 2.75601 187.805 2.19601C188.365 1.72001 188.995 1.37001 189.695 1.14601C190.395 0.922007 191.123 0.754007 191.879 0.642006C193.419 0.446007 194.889 0.502007 196.289 0.810007C197.689 1.09001 198.893 1.60801 199.901 2.36401C200.909 3.12001 201.665 4.12801 202.169 5.38801C202.673 6.62001 202.827 8.09001 202.631 9.79801L202.589 10.05C202.533 10.134 202.407 10.176 202.211 10.176C202.015 10.176 201.693 10.19 201.245 10.218C200.825 10.218 200.461 10.232 200.153 10.26C199.873 10.26 199.579 10.26 199.271 10.26C198.991 10.26 198.697 10.246 198.389 10.218C198.081 10.19 197.717 10.148 197.297 10.092C197.213 9.81201 197.087 9.47601 196.919 9.08401C196.779 8.66401 196.583 8.28601 196.331 7.95001C196.107 7.58601 195.841 7.27801 195.533 7.02601C195.225 6.74601 194.861 6.60601 194.441 6.60601C193.965 6.57801 193.503 6.56401 193.055 6.56401C192.607 6.56401 192.215 6.73201 191.879 7.06801C191.823 7.12401 191.739 7.27801 191.627 7.53001C191.543 7.75401 191.473 7.97801 191.417 8.20201C191.221 8.87401 191.053 9.68601 190.913 10.638C190.801 11.59 190.717 12.612 190.661 13.704C190.605 14.768 190.591 15.874 190.619 17.022C190.647 18.17 190.703 19.262 190.787 20.298C190.843 20.914 190.955 21.586 191.123 22.314C191.291 23.042 191.641 23.616 192.173 24.036C192.425 24.204 192.747 24.33 193.139 24.414C193.559 24.47 193.993 24.456 194.441 24.372C194.917 24.288 195.351 24.176 195.743 24.036C196.051 23.896 196.317 23.714 196.541 23.49C196.765 23.238 196.933 22.916 197.045 22.524C197.073 22.412 197.101 22.23 197.129 21.978C197.185 21.698 197.213 21.418 197.213 21.138C197.241 20.858 197.241 20.606 197.213 20.382C197.213 20.158 197.171 20.032 197.087 20.004C196.919 19.976 196.681 19.976 196.373 20.004C196.093 20.004 195.785 20.018 195.449 20.046C195.141 20.046 194.847 20.046 194.567 20.046C194.315 20.018 194.119 19.976 193.979 19.92C193.923 19.472 193.881 19.08 193.853 18.744C193.853 18.408 193.853 18.086 193.853 17.778C193.881 17.442 193.895 17.106 193.895 16.77C193.895 16.434 193.867 16.014 193.811 15.51V15.468C193.811 15.44 193.825 15.426 193.853 15.426Z" fill="#F32585"/>
						<path d="M130.952 136.954C130.952 137.01 130.91 137.038 130.826 137.038C129.958 137.178 129.048 137.29 128.096 137.374C127.172 137.43 126.29 137.528 125.45 137.668H125.408C125.268 139.432 125.184 141.196 125.156 142.96C125.128 144.696 125.1 146.362 125.072 147.958C124.512 148.014 123.84 148.056 123.056 148.084C122.3 148.112 121.544 148.126 120.788 148.126C120.032 148.126 119.36 148.112 118.772 148.084C118.212 148.056 117.876 148.014 117.764 147.958L117.722 147.916C117.722 146.236 117.722 144.668 117.722 143.212C117.722 141.728 117.722 140.3 117.722 138.928C117.75 137.556 117.764 136.184 117.764 134.812C117.764 133.412 117.764 131.942 117.764 130.402C117.792 128.862 117.806 127.21 117.806 125.446C117.806 123.654 117.806 121.666 117.806 119.482V119.44C118.282 119.356 118.968 119.272 119.864 119.188C120.76 119.104 121.768 119.02 122.888 118.936C124.036 118.852 125.24 118.796 126.5 118.768C127.788 118.712 129.048 118.698 130.28 118.726C131.512 118.726 132.674 118.782 133.766 118.894C134.858 119.006 135.796 119.16 136.58 119.356C136.58 119.72 136.58 120.182 136.58 120.742C136.608 121.302 136.622 121.89 136.622 122.506C136.622 123.094 136.622 123.668 136.622 124.228C136.622 124.76 136.608 125.208 136.58 125.572C135.824 125.628 134.97 125.684 134.018 125.74C133.094 125.796 132.128 125.852 131.12 125.908C130.14 125.936 129.146 125.978 128.138 126.034C127.158 126.09 126.234 126.16 125.366 126.244C125.058 126.972 124.932 127.672 124.988 128.344C125.044 129.016 125.198 129.576 125.45 130.024C125.478 130.052 125.506 130.066 125.534 130.066C125.926 130.122 126.36 130.164 126.836 130.192C127.34 130.192 127.83 130.192 128.306 130.192C128.782 130.192 129.244 130.178 129.692 130.15C130.14 130.122 130.518 130.094 130.826 130.066C130.91 130.262 130.952 130.64 130.952 131.2C130.98 131.76 130.98 132.39 130.952 133.09C130.924 133.762 130.896 134.448 130.868 135.148C130.868 135.848 130.896 136.45 130.952 136.954Z" fill="#F32585"/>
						<path d="M163 143.422C163 143.702 163.014 143.954 163.042 144.178C163.098 145.186 163.126 145.956 163.126 146.488C163.126 146.992 163.084 147.37 163 147.622C162.944 147.846 162.832 147.972 162.664 148C162.496 148 162.258 148 161.95 148C161.642 147.972 161.236 147.972 160.732 148C160.256 148.028 159.43 148.056 158.254 148.084C157.106 148.112 155.51 148.126 153.466 148.126C151.45 148.126 148.748 148.098 145.36 148.042V147.286C145.444 145.186 145.514 143.296 145.57 141.616C145.626 139.908 145.654 138.326 145.654 136.87C145.682 135.386 145.696 133.958 145.696 132.586C145.696 131.214 145.682 129.814 145.654 128.386C145.626 126.958 145.598 125.446 145.57 123.85C145.542 122.226 145.514 120.434 145.486 118.474C145.766 118.362 146.2 118.278 146.788 118.222C147.376 118.138 148.006 118.096 148.678 118.096C149.35 118.096 150.008 118.138 150.652 118.222C151.296 118.306 151.814 118.432 152.206 118.6C152.15 120.42 152.122 122.296 152.122 124.228C152.15 126.132 152.178 128.05 152.206 129.982C152.234 131.914 152.248 133.846 152.248 135.778C152.276 137.682 152.276 139.53 152.248 141.322V141.364C152.444 141.308 152.808 141.294 153.34 141.322C153.9 141.322 154.544 141.336 155.272 141.364C156 141.392 156.77 141.434 157.582 141.49C158.422 141.518 159.206 141.546 159.934 141.574C160.69 141.602 161.348 141.63 161.908 141.658C162.496 141.658 162.902 141.644 163.126 141.616C163.126 141.924 163.112 142.232 163.084 142.54C163.056 142.82 163.028 143.114 163 143.422Z" fill="#F32585"/>
						<path d="M184.203 142.246C185.995 142.33 187.843 142.344 189.747 142.288V142.372C189.803 143.268 189.817 144.206 189.789 145.186C189.761 146.138 189.635 147.034 189.411 147.874C186.555 147.846 183.643 147.888 180.675 148C177.735 148.084 174.907 148.014 172.191 147.79C172.191 145.354 172.163 142.946 172.107 140.566C172.051 138.158 172.009 135.764 171.981 133.384C171.953 131.004 171.953 128.624 171.981 126.244C172.009 123.864 172.093 121.47 172.233 119.062C173.325 119.006 174.501 118.964 175.761 118.936C177.049 118.88 178.337 118.838 179.625 118.81C180.913 118.782 182.159 118.754 183.363 118.726C184.567 118.698 185.631 118.684 186.555 118.684C187.479 118.684 188.221 118.698 188.781 118.726C189.341 118.754 189.621 118.782 189.621 118.81C189.761 119.79 189.789 120.784 189.705 121.792C189.649 122.8 189.621 123.794 189.621 124.774V124.816C188.725 125.012 187.815 125.138 186.891 125.194C185.995 125.222 185.085 125.236 184.161 125.236C183.237 125.208 182.313 125.194 181.389 125.194C180.465 125.194 179.541 125.236 178.617 125.32H178.491L178.449 125.362C178.477 126.174 178.435 127.014 178.323 127.882C178.239 128.722 178.295 129.52 178.491 130.276L178.533 130.318C179.373 130.374 180.227 130.402 181.095 130.402C181.963 130.402 182.831 130.416 183.699 130.444V130.486C183.839 131.438 183.881 132.39 183.825 133.342C183.769 134.294 183.755 135.288 183.783 136.324C183.363 136.436 182.887 136.506 182.355 136.534C181.823 136.534 181.305 136.534 180.801 136.534C180.325 136.534 179.891 136.548 179.499 136.576C179.107 136.604 178.841 136.674 178.701 136.786C178.561 137.598 178.505 138.508 178.533 139.516C178.589 140.524 178.645 141.364 178.701 142.036L178.743 142.078C180.591 142.078 182.411 142.134 184.203 142.246Z" fill="#F32585"/>
						<path d="M211.518 142.246C213.31 142.33 215.158 142.344 217.062 142.288V142.372C217.118 143.268 217.132 144.206 217.104 145.186C217.076 146.138 216.95 147.034 216.726 147.874C213.87 147.846 210.958 147.888 207.99 148C205.05 148.084 202.222 148.014 199.506 147.79C199.506 145.354 199.478 142.946 199.422 140.566C199.366 138.158 199.324 135.764 199.296 133.384C199.268 131.004 199.268 128.624 199.296 126.244C199.324 123.864 199.408 121.47 199.548 119.062C200.64 119.006 201.816 118.964 203.076 118.936C204.364 118.88 205.652 118.838 206.94 118.81C208.228 118.782 209.474 118.754 210.678 118.726C211.882 118.698 212.946 118.684 213.87 118.684C214.794 118.684 215.536 118.698 216.096 118.726C216.656 118.754 216.936 118.782 216.936 118.81C217.076 119.79 217.104 120.784 217.02 121.792C216.964 122.8 216.936 123.794 216.936 124.774V124.816C216.04 125.012 215.13 125.138 214.206 125.194C213.31 125.222 212.4 125.236 211.476 125.236C210.552 125.208 209.628 125.194 208.704 125.194C207.78 125.194 206.856 125.236 205.932 125.32H205.806L205.764 125.362C205.792 126.174 205.75 127.014 205.638 127.882C205.554 128.722 205.61 129.52 205.806 130.276L205.848 130.318C206.688 130.374 207.542 130.402 208.41 130.402C209.278 130.402 210.146 130.416 211.014 130.444V130.486C211.154 131.438 211.196 132.39 211.14 133.342C211.084 134.294 211.07 135.288 211.098 136.324C210.678 136.436 210.202 136.506 209.67 136.534C209.138 136.534 208.62 136.534 208.116 136.534C207.64 136.534 207.206 136.548 206.814 136.576C206.422 136.604 206.156 136.674 206.016 136.786C205.876 137.598 205.82 138.508 205.848 139.516C205.904 140.524 205.96 141.364 206.016 142.036L206.058 142.078C207.906 142.078 209.726 142.134 211.518 142.246Z" fill="#F32585"/>
						<path d="M234.171 118.39C237.223 118.362 240.191 118.502 243.075 118.81C243.131 119.734 243.145 120.798 243.117 122.002C243.117 123.206 243.047 124.312 242.907 125.32C242.375 125.208 241.717 125.166 240.933 125.194C240.149 125.222 239.099 125.264 237.783 125.32H237.657C237.657 125.348 237.643 125.376 237.615 125.404C237.615 125.404 237.615 125.418 237.615 125.446C237.587 125.586 237.559 125.81 237.531 126.118C237.531 126.398 237.531 126.86 237.531 127.504C237.531 128.12 237.531 128.946 237.531 129.982C237.559 130.99 237.587 132.306 237.615 133.93C237.643 135.526 237.671 137.458 237.699 139.726C237.727 141.966 237.769 144.612 237.825 147.664V147.748C237.321 147.832 236.761 147.888 236.145 147.916C235.557 147.916 234.955 147.916 234.339 147.916C233.751 147.916 233.163 147.916 232.575 147.916C231.987 147.916 231.441 147.958 230.937 148.042C230.909 147.93 230.909 147.426 230.937 146.53C230.965 145.634 230.979 144.304 230.979 142.54C231.007 140.748 230.993 138.466 230.937 135.694C230.909 132.922 230.811 129.576 230.643 125.656L230.601 125.614C230.265 125.446 229.845 125.348 229.341 125.32C228.837 125.264 228.333 125.236 227.829 125.236C227.325 125.208 226.863 125.194 226.443 125.194C226.023 125.194 225.729 125.166 225.561 125.11C225.505 124.998 225.449 124.718 225.393 124.27C225.365 123.822 225.337 123.29 225.309 122.674C225.309 122.03 225.309 121.344 225.309 120.616C225.309 119.888 225.337 119.188 225.393 118.516C225.393 118.488 225.379 118.474 225.351 118.474C225.351 118.474 225.351 118.46 225.351 118.432C228.207 118.404 231.147 118.39 234.171 118.39Z" fill="#F32585"/>
						<path d="M256.064 118.474C256.736 118.502 257.702 118.502 258.962 118.474H259.97V118.642C259.97 121.05 259.928 123.472 259.844 125.908C259.788 128.344 259.732 130.794 259.676 133.258C259.648 135.694 259.648 138.13 259.676 140.566C259.704 143.002 259.788 145.41 259.928 147.79C259.704 148.014 259.228 148.14 258.5 148.168C257.8 148.224 257.03 148.238 256.19 148.21C255.378 148.182 254.594 148.14 253.838 148.084C253.082 148.056 252.564 148.084 252.284 148.168C252.48 145.648 252.564 143.114 252.536 140.566C252.508 138.018 252.452 135.498 252.368 133.006C252.312 130.486 252.27 128.008 252.242 125.572C252.242 123.108 252.368 120.7 252.62 118.348V118.264C252.76 118.236 253.026 118.25 253.418 118.306C253.838 118.334 254.146 118.348 254.342 118.348C254.846 118.376 255.42 118.418 256.064 118.474Z" fill="#F32585"/>
						<path d="M287.466 148.126C287.27 148.182 286.934 148.21 286.458 148.21C285.898 148.21 285.254 148.168 284.526 148.084C283.798 148.028 283.154 148 282.594 148C281.67 145.928 280.746 143.926 279.822 141.994C278.926 140.034 278.156 138.158 277.512 136.366L277.092 135.106C276.98 134.798 276.868 134.518 276.756 134.266C276.672 133.986 276.602 133.846 276.546 133.846C276.518 133.846 276.476 134.182 276.42 134.854C276.392 135.526 276.364 136.38 276.336 137.416C276.308 138.452 276.28 139.6 276.252 140.86C276.252 142.12 276.252 143.338 276.252 144.514C276.252 145.158 276.252 145.788 276.252 146.404C276.252 146.992 276.266 147.524 276.294 148C275.986 148.084 275.678 148.14 275.37 148.168C275.062 148.196 274.754 148.21 274.446 148.21C273.774 148.21 273.088 148.168 272.388 148.084C271.716 148 271.058 147.958 270.414 147.958V145.018C270.414 142.358 270.386 139.824 270.33 137.416C270.302 135.008 270.288 132.488 270.288 129.856C270.288 127.924 270.316 126.02 270.372 124.144C270.428 122.24 270.526 120.392 270.666 118.6C270.946 118.544 271.24 118.502 271.548 118.474C271.884 118.446 272.22 118.432 272.556 118.432C272.724 118.432 273.004 118.446 273.396 118.474C273.788 118.474 274.18 118.502 274.572 118.558C274.964 118.586 275.3 118.628 275.58 118.684C275.888 118.74 276.042 118.796 276.042 118.852C276.238 119.356 276.42 119.776 276.588 120.112C276.756 120.448 276.91 120.77 277.05 121.078C277.218 121.386 277.386 121.736 277.554 122.128C277.75 122.492 277.974 122.968 278.226 123.556C278.282 123.696 278.408 123.962 278.604 124.354C278.8 124.746 279.024 125.208 279.276 125.74C279.528 126.244 279.794 126.79 280.074 127.378C280.354 127.938 280.606 128.456 280.83 128.932C281.082 129.38 281.292 129.772 281.46 130.108C281.628 130.416 281.726 130.57 281.754 130.57C281.838 130.514 281.908 130.234 281.964 129.73C282.02 129.226 282.048 128.736 282.048 128.26C282.048 127.14 282.02 126.104 281.964 125.152C281.936 124.172 281.922 123.178 281.922 122.17C281.922 121.582 281.922 120.994 281.922 120.406C281.95 119.79 281.978 119.132 282.006 118.432C282.958 118.264 283.966 118.18 285.03 118.18C286.066 118.18 286.99 118.264 287.802 118.432V131.956C287.83 133.132 287.844 134.322 287.844 135.526C287.844 136.73 287.844 137.934 287.844 139.138C287.844 139.95 287.83 140.734 287.802 141.49C287.802 142.246 287.802 143.016 287.802 143.8C287.802 144.36 287.802 144.92 287.802 145.48C287.83 146.04 287.844 146.6 287.844 147.16V148C287.788 148.028 287.662 148.07 287.466 148.126Z" fill="#F32585"/>
						<path d="M306.784 133.426C306.784 133.426 306.812 133.412 306.868 133.384C307.232 133.16 307.82 133.034 308.632 133.006C309.472 132.95 310.354 132.936 311.278 132.964C312.202 132.992 313.056 133.048 313.84 133.132C314.652 133.188 315.198 133.216 315.478 133.216H315.562L315.604 133.258C315.772 134.742 315.884 136.324 315.94 138.004C315.996 139.656 315.884 141.238 315.604 142.75C315.464 144.178 315.03 145.27 314.302 146.026C313.574 146.782 312.678 147.356 311.614 147.748C310.914 147.944 310.186 148.112 309.43 148.252C308.674 148.42 307.904 148.532 307.12 148.588C306.336 148.672 305.566 148.672 304.81 148.588C304.082 148.504 303.382 148.322 302.71 148.042C301.59 147.566 300.736 146.922 300.148 146.11C299.56 145.298 299.098 144.29 298.762 143.086C298.678 142.778 298.58 142.358 298.468 141.826C298.384 141.266 298.314 140.706 298.258 140.146C298.174 139.25 298.104 138.438 298.048 137.71C297.992 136.982 297.936 136.268 297.88 135.568C297.852 134.84 297.824 134.084 297.796 133.3C297.796 132.488 297.81 131.564 297.838 130.528C297.866 129.632 297.908 128.722 297.964 127.798C298.02 126.846 298.118 125.922 298.258 125.026C298.398 124.102 298.636 123.206 298.972 122.338C299.336 121.47 299.924 120.756 300.736 120.196C301.296 119.72 301.926 119.37 302.626 119.146C303.326 118.922 304.054 118.754 304.81 118.642C306.35 118.446 307.82 118.502 309.22 118.81C310.62 119.09 311.824 119.608 312.832 120.364C313.84 121.12 314.596 122.128 315.1 123.388C315.604 124.62 315.758 126.09 315.562 127.798L315.52 128.05C315.464 128.134 315.338 128.176 315.142 128.176C314.946 128.176 314.624 128.19 314.176 128.218C313.756 128.218 313.392 128.232 313.084 128.26C312.804 128.26 312.51 128.26 312.202 128.26C311.922 128.26 311.628 128.246 311.32 128.218C311.012 128.19 310.648 128.148 310.228 128.092C310.144 127.812 310.018 127.476 309.85 127.084C309.71 126.664 309.514 126.286 309.262 125.95C309.038 125.586 308.772 125.278 308.464 125.026C308.156 124.746 307.792 124.606 307.372 124.606C306.896 124.578 306.434 124.564 305.986 124.564C305.538 124.564 305.146 124.732 304.81 125.068C304.754 125.124 304.67 125.278 304.558 125.53C304.474 125.754 304.404 125.978 304.348 126.202C304.152 126.874 303.984 127.686 303.844 128.638C303.732 129.59 303.648 130.612 303.592 131.704C303.536 132.768 303.522 133.874 303.55 135.022C303.578 136.17 303.634 137.262 303.718 138.298C303.774 138.914 303.886 139.586 304.054 140.314C304.222 141.042 304.572 141.616 305.104 142.036C305.356 142.204 305.678 142.33 306.07 142.414C306.49 142.47 306.924 142.456 307.372 142.372C307.848 142.288 308.282 142.176 308.674 142.036C308.982 141.896 309.248 141.714 309.472 141.49C309.696 141.238 309.864 140.916 309.976 140.524C310.004 140.412 310.032 140.23 310.06 139.978C310.116 139.698 310.144 139.418 310.144 139.138C310.172 138.858 310.172 138.606 310.144 138.382C310.144 138.158 310.102 138.032 310.018 138.004C309.85 137.976 309.612 137.976 309.304 138.004C309.024 138.004 308.716 138.018 308.38 138.046C308.072 138.046 307.778 138.046 307.498 138.046C307.246 138.018 307.05 137.976 306.91 137.92C306.854 137.472 306.812 137.08 306.784 136.744C306.784 136.408 306.784 136.086 306.784 135.778C306.812 135.442 306.826 135.106 306.826 134.77C306.826 134.434 306.798 134.014 306.742 133.51V133.468C306.742 133.44 306.756 133.426 306.784 133.426Z" fill="#F32585"/>
						<path d="M104.768 73.984C105.376 74.752 105.824 75.392 106.112 75.904C106.4 76.4 106.544 76.984 106.544 77.656C106.544 77.928 106.52 78.224 106.472 78.544C106.216 79.968 105.552 80.944 104.48 81.472C103.408 81.984 102.032 82.24 100.352 82.24C99.8562 82.24 98.3042 82.144 95.6962 81.952C95.6482 80.752 95.6242 78.832 95.6242 76.192C95.6242 73.328 95.6322 70.744 95.6482 68.44V65.32C97.0562 64.92 98.4082 64.72 99.7042 64.72C101.512 64.72 102.992 65.12 104.144 65.92C105.312 66.704 105.896 68 105.896 69.808C105.896 70.976 105.488 72.248 104.672 73.624V73.6C104.64 73.664 104.624 73.712 104.624 73.744C104.624 73.792 104.672 73.864 104.768 73.96V73.984ZM102.104 69.808C101.864 69.36 101.56 69.088 101.192 68.992C100.936 68.96 100.736 68.944 100.592 68.944C100.176 68.912 99.8642 68.872 99.6562 68.824C99.7042 69.096 99.7282 69.512 99.7282 70.072V70.936C99.7282 71.336 99.7362 71.648 99.7522 71.872H100.448C101.152 71.872 101.632 71.632 101.888 71.152C102.096 70.768 102.2 70.456 102.2 70.216C102.2 70.072 102.168 69.936 102.104 69.808ZM102.104 77.176C102.104 76.904 102.056 76.608 101.96 76.288V76.312C101.88 76.136 101.768 75.976 101.624 75.832C101.48 75.688 101.336 75.6 101.192 75.568C100.936 75.504 100.56 75.456 100.064 75.424C100.016 75.424 99.9602 75.432 99.8962 75.448C99.8482 75.448 99.7922 75.44 99.7282 75.424C99.5682 76.096 99.4882 76.68 99.4882 77.176C99.4882 77.752 99.5762 78.2 99.7522 78.52C100.328 78.536 100.776 78.52 101.096 78.472C101.432 78.408 101.712 78.24 101.936 77.968C102.048 77.808 102.104 77.544 102.104 77.176Z" fill="#F32585"/>
						<path d="M122.901 65.824C122.981 67.536 123.021 69.12 123.021 70.576C123.021 73.344 122.885 75.952 122.613 78.4C122.485 79.504 122.037 80.432 121.269 81.184C120.517 81.92 119.541 82.344 118.341 82.456H118.365C118.077 82.488 117.813 82.504 117.573 82.504C116.629 82.504 115.725 82.352 114.861 82.048C113.997 81.76 113.277 81.312 112.701 80.704C112.141 80.096 111.845 79.352 111.813 78.472C111.813 77.304 111.829 75.552 111.861 73.216L111.885 71.656C111.917 69.96 111.933 68.704 111.933 67.888C111.933 66.832 111.925 66.056 111.909 65.56H112.509L113.949 65.512C114.733 65.512 115.421 65.6 116.013 65.776C115.949 67.568 115.917 68.944 115.917 69.904C115.917 72.224 116.021 74.792 116.229 77.608V77.584C116.325 77.904 116.469 78.152 116.661 78.328C116.853 78.488 117.061 78.568 117.285 78.568C117.541 78.568 117.781 78.464 118.005 78.256C118.229 78.048 118.381 77.784 118.461 77.464V77.488C118.525 76.016 118.573 73.688 118.605 70.504L118.629 68.968C118.629 68.2 118.645 67.144 118.677 65.8L119.181 65.728C119.405 65.728 119.709 65.704 120.093 65.656C120.749 65.592 121.141 65.568 121.269 65.584C121.957 65.584 122.437 65.664 122.709 65.824H122.901Z" fill="#F32585"/>
						<path d="M138.978 65.2C139.01 65.744 139.026 66.256 139.026 66.736C139.026 67.664 138.97 68.496 138.858 69.232C138.33 69.136 137.914 69.088 137.61 69.088L136.482 69.064C136.066 69.064 135.858 69.088 135.858 69.136C135.826 69.36 135.81 69.832 135.81 70.552C135.81 71.96 135.866 75.752 135.978 81.928C135.514 82.008 134.97 82.048 134.346 82.048H133.65C132.85 82.048 132.114 82.104 131.442 82.216C131.394 82.136 131.354 81.976 131.322 81.736C131.306 81.48 131.306 81.248 131.322 81.04V79.864L131.346 77.704C131.346 74.792 131.282 71.952 131.154 69.184C130.978 69.104 130.73 69.064 130.41 69.064L129.45 69.088C128.906 69.088 128.514 69.048 128.274 68.968C128.226 68.872 128.186 68.608 128.154 68.176C128.122 67.744 128.106 67.256 128.106 66.712C128.106 65.912 128.114 65.336 128.13 64.984H129.162L130.098 64.96H131.442L132.834 64.936C135.218 64.936 137.162 65.024 138.666 65.2H138.978Z" fill="#F32585"/>
						<path d="M159.664 79.984C158.656 77.776 157.992 76.248 157.672 75.4V80.008C157.672 81 157.68 81.68 157.696 82.048C157.264 82.176 156.792 82.24 156.28 82.24C156.12 82.24 155.88 82.224 155.56 82.192C155.208 82.16 154.952 82.144 154.792 82.144L153.616 82.096V80.296C153.616 79.272 153.6 77.816 153.568 75.928C153.552 74.984 153.544 73.552 153.544 71.632C153.544 69.056 153.616 66.896 153.76 65.152C154.192 65.04 154.672 64.984 155.2 64.984C155.552 64.984 155.976 65.016 156.472 65.08C156.984 65.144 157.336 65.24 157.528 65.368C157.752 65.784 158.024 66.368 158.344 67.12C158.68 67.856 159 68.592 159.304 69.328L160.264 71.536C160.232 70.416 160.216 69.096 160.216 67.576C160.216 66.344 160.224 65.496 160.24 65.032C160.896 64.904 161.592 64.84 162.328 64.84C162.952 64.84 163.6 64.912 164.272 65.056V82.072C164.224 82.072 164.128 82.096 163.984 82.144C163.824 82.208 163.544 82.24 163.144 82.24C163.064 82.256 162.64 82.232 161.872 82.168C161.68 82.152 161.432 82.136 161.128 82.12C160.84 82.104 160.672 82.104 160.624 82.12L159.664 79.984Z" fill="#F32585"/>
						<path d="M181.001 69.28C181.049 69.776 181.073 70.28 181.073 70.792L181.049 71.224V71.656C181.017 72.184 181.001 72.96 181.001 73.984C181.001 75.12 180.977 75.984 180.929 76.576L180.857 77.368C180.777 78.664 180.449 79.768 179.873 80.68C179.633 81.016 179.273 81.312 178.793 81.568C178.313 81.824 177.785 82.032 177.209 82.192C176.617 82.368 175.921 82.456 175.121 82.456C174.753 82.456 174.497 82.448 174.353 82.432C173.569 82.368 172.865 82.2 172.241 81.928C171.633 81.64 171.185 81.224 170.897 80.68C170.513 79.96 170.305 79.056 170.273 77.968L170.225 77.2C170.209 77.072 170.201 76.808 170.201 76.408C170.121 75.096 170.081 73.84 170.081 72.64C170.081 71.904 170.105 71.168 170.153 70.432C170.201 69.632 170.337 68.856 170.561 68.104C170.801 67.336 171.161 66.664 171.641 66.088L172.169 65.8C173.193 65.304 174.313 65.056 175.529 65.056C176.297 65.056 177.017 65.16 177.689 65.368C178.377 65.56 178.977 65.848 179.489 66.232C180.049 66.744 180.417 67.248 180.593 67.744C180.785 68.256 180.921 68.768 181.001 69.28ZM177.281 71.896L177.185 70.648C177.153 70.2 177.041 69.808 176.849 69.472C176.673 69.12 176.441 68.872 176.153 68.728C176.025 68.68 175.897 68.656 175.769 68.656C175.385 68.656 175.009 68.784 174.641 69.04C174.449 69.2 174.257 69.432 174.065 69.736C173.889 70.024 173.753 70.32 173.657 70.624C173.497 71.328 173.417 72.224 173.417 73.312C173.417 73.856 173.425 74.264 173.441 74.536V74.512C173.505 74.832 173.553 75.256 173.585 75.784L173.609 76.12C173.673 76.92 173.761 77.512 173.873 77.896V77.872C174.017 78.192 174.225 78.44 174.497 78.616C174.785 78.776 175.089 78.856 175.409 78.856C175.665 78.856 175.921 78.8 176.177 78.688C176.449 78.56 176.681 78.384 176.873 78.16C177.033 77.952 177.129 77.776 177.161 77.632C177.209 77.488 177.233 77.264 177.233 76.96C177.233 76.688 177.241 76.488 177.257 76.36L177.281 76.048L177.305 75.592V75.256L177.329 74.8V73.648L177.281 72.016V71.896Z" fill="#F32585"/>
						<path d="M196.946 65.2C196.978 65.744 196.994 66.256 196.994 66.736C196.994 67.664 196.938 68.496 196.826 69.232C196.298 69.136 195.882 69.088 195.578 69.088L194.45 69.064C194.034 69.064 193.826 69.088 193.826 69.136C193.794 69.36 193.778 69.832 193.778 70.552C193.778 71.96 193.834 75.752 193.946 81.928C193.482 82.008 192.938 82.048 192.314 82.048H191.618C190.818 82.048 190.082 82.104 189.41 82.216C189.362 82.136 189.322 81.976 189.29 81.736C189.274 81.48 189.274 81.248 189.29 81.04V79.864L189.314 77.704C189.314 74.792 189.25 71.952 189.122 69.184C188.946 69.104 188.698 69.064 188.378 69.064L187.418 69.088C186.874 69.088 186.482 69.048 186.242 68.968C186.194 68.872 186.154 68.608 186.122 68.176C186.09 67.744 186.074 67.256 186.074 66.712C186.074 65.912 186.082 65.336 186.098 64.984H187.13L188.066 64.96H189.41L190.802 64.936C193.186 64.936 195.13 65.024 196.634 65.2H196.946Z" fill="#F32585"/>
					</svg>
				</div>
				<div className="subtitle">
					<div>What is a love life to you?</div><div>&ensp;Asking for a friend...</div>
					{/* <div>What is a love life to you? Asking for a friend...</div> */}
				</div>
				<Image src={coverSrc} alt={coverAlt} fill style={{ objectFit: 'cover'}}/>
				<div className="cover-gradient" />
				<style jsx>{`
					.cover {
						position: relative;
						display: flex;
						gap: 3.5rem;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 100%;
						flex: 2;
					}
					.dafna-title {
						color: #F32585;
						z-index: 2;
						width: calc(100% - (3*${defaultPadding}));
						max-width: 540px;
						display: flex;
						flex-direction: column;
						font-family: ${fontFamilies[`londrina_solid`].style.fontFamily};
					}
					.subtitle {
						width: calc(100% - 46px);
						flex-wrap: wrap;
						justify-content: center;
						z-index: 2;
						color: white;
						font-weight: bold; 
						display: flex;
					}
					.cover-gradient {
						position: absolute;
						bottom: 0;
						height: 80px;
						background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
						width: 100%;
					}

					@media screen and (min-width: 1024px) {
						.cover {
							height: var(--sidebar-height);
						}
					}
				`}</style>
			</div>
			
	)
}