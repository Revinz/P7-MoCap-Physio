using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Core.Data;
using System;
using System.IO;

/// <summary>
///  Just for making sure the dotnet ML framework works.
///  If this does not work then the general setup / installation is wrong.
///  
///  We don't use the latest version of dotnet ML. We use something like 
/// </summary>

[Obsolete("No longer used due to moving ML to python.")]
public class IrisML_Test : MonoBehaviour
{

    static readonly string _dataPath = Path.Combine(Environment.CurrentDirectory, "Assets", "Data","iris", "iris_train.data");
    static readonly string _dataTestPath = Path.Combine(Environment.CurrentDirectory, "Assets", "Data", "iris", "iris_test.data");
    static readonly string _modelPath = Path.Combine(Environment.CurrentDirectory, "Assets", "Data", "iris", "IrisMultiClassModel.zip");
    MLContext mlContext;
    void Start()
    {
        
        // STEP 1: Common data loading configuration
        var trainingDataView = mlContext.Data.ReadFromTextFile<IrisData>(_dataPath, hasHeader: true);
        var testDataView = mlContext.Data.ReadFromTextFile<IrisData>(_dataTestPath, hasHeader: true);


        // STEP 2: Common data process configuration with pipeline data transformations
        var dataProcessPipeline = mlContext.Transforms.Conversion.MapValueToKey(inputColumn: nameof(IrisData.Label), outputColumn: "KeyColumn")
            .Append(mlContext.Transforms.Concatenate("Features", nameof(IrisData.SepalLength),
                                                                               nameof(IrisData.SepalWidth),
                                                                               nameof(IrisData.PetalLength),
                                                                               nameof(IrisData.PetalWidth))
                                                                   .AppendCacheCheckpoint(mlContext));
        // Use in-memory cache for small/medium datasets to lower training time. 
        // Do NOT use it (remove .AppendCacheCheckpoint()) when handling very large datasets. 

        // STEP 3: Set the training algorithm, then append the trainer to the pipeline  
        var trainer = mlContext.MulticlassClassification.Trainers.StochasticDualCoordinateAscent(labelColumn: "KeyColumn", featureColumn: "Features")
        .Append(mlContext.Transforms.Conversion.MapKeyToValue(inputColumn: "KeyColumn" /*, outputColumnName: nameof(IrisData.Label)*/));

        var trainingPipeline = dataProcessPipeline.Append(trainer);

        // STEP 4: Train the model fitting to the DataSet
        Console.WriteLine("=============== Training the model ===============");
        ITransformer trainedModel = trainingPipeline.Fit(trainingDataView);

        // STEP 5: Evaluate the model and show accuracy stats
        Console.WriteLine("===== Evaluating Model's accuracy with Test data =====");
        var predictions = trainedModel.Transform(testDataView);
        var metrics = mlContext.MulticlassClassification.Evaluate(predictions, "Label", "Score");

        /*  -- Uncommented due to errors still existing.
        Common.ConsoleHelper.PrintMultiClassClassificationMetrics(trainer.ToString(), metrics);

        // STEP 6: Save/persist the trained model to a .ZIP file
        mlContext.Model.Save(trainedModel, trainingDataView.Schema, _modelPath);
        Console.WriteLine("The model is saved to {0}", _modelPath);
        */
    }

}

public class IrisData
{
    [LoadColumn(0)]
    public float Label;

    [LoadColumn(1)]
    public float SepalLength;

    [LoadColumn(2)]
    public float SepalWidth;

    [LoadColumn(3)]
    public float PetalLength;

    [LoadColumn(4)]
    public float PetalWidth;
}

public class IrisPrediction
{
    public float[] Score;
}

public class SampleIrisData
{
    internal static readonly IrisData Iris1 = new IrisData()
    {
        SepalLength = 5.1f,
        SepalWidth = 3.3f,
        PetalLength = 1.6f,
        PetalWidth = 0.2f,
    };

    internal static readonly IrisData Iris2 = new IrisData()
    {
        SepalLength = 6.0f,
        SepalWidth = 3.4f,
        PetalLength = 6.1f,
        PetalWidth = 2.0f,
    };

    internal static readonly IrisData Iris3 = new IrisData()
    {
        SepalLength = 4.4f,
        SepalWidth = 3.1f,
        PetalLength = 2.5f,
        PetalWidth = 1.2f,
    };
}