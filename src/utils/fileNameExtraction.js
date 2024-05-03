export const trimFileNameBeforeExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf('.')

    if (lastDotIndex !== -1 && lastDotIndex !== 0) {
        const trimmedFileName = fileName.substring(0, lastDotIndex)
        return trimmedFileName
    }

    return fileName
}

export const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2)
}

export const documentStatus = {
    UPLOADED: 'Document is uploaded in S3',
    VALIDATION_IN_PROGRESS: 'Document validation is in progress',
    VALIDATION_PASSED: 'Document is valid',
    VALIDATION_FAILED: 'Document is not valid',
    LLM_TRAINING_IN_PROGRESS: 'LLM Training is in Progress',
    LLM_TRAINING_COMPLETED: 'LLM Training Completed Successfully',
    LLM_TRAINING_FAILED: 'LLM Training Failed',
    DELETION_IN_PROGRESS: 'Document Deletion Is In Progress',
    DEACTIVATED: 'Document is deleted',
}
