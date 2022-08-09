import React from 'react'
import { motion } from 'framer-motion';
function MainPage() {
    return <motion.div
        key='content'
        initial='collapsed'
        animate='open'
        exit='collapsed'
        variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>Bosh sahifa</motion.div>
}
export default MainPage
