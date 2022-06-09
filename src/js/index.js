import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/all.scss';
import '../img/logo.png';

import '../csv/antutu_android_vs_ios_v4.csv';
import '../csv/CPU_benchmark_v4.csv';
import '../csv/CPU_r23_v2.csv';
import '../csv/GPU_benchmarks_v7.csv';
import '../csv/GPU_scores_graphicsAPIs.csv';
import '../csv/gpu_specs_v6.csv';
import '../csv/ML_ALL_benchmarks.csv';
import '../csv/RAM_Benchmarks_megalist.csv';
import '../csv/smartphone_cpu_stats.csv';

import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));