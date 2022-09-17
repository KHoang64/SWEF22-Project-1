using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering.PostProcessing;
using DG.Tweening;

public class Warp : MonoBehaviour
{
    [SerializeField] private ParticleSystem dashParticle = default;
    [SerializeField] private PostProcessVolume ogVolume = default;
    [SerializeField] private PostProcessVolume dashVolume = default;
    ColorGrading colorGradingLayer = null;
    bool switchT = true;
    bool showConsole;

    // Start is called before the first frame update
    void Start()
    {
        ogVolume.profile.TryGetSettings(out colorGradingLayer);
    }
    
    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.G))
        {
            LeFlick();
            
        }
        if (Input.GetKeyDown(KeyCode.Q))
        {
            Dash();
        }
    }
    public void LeFlick()
    {
        //dashParticle.Play();

        //Sequence dash = DOTween.Sequence().Insert(0, transform.DOMove(transform.position + (transform.forward * 5), .2f))
        //.AppendCallback(() => dashParticle.Stop());
        //DOVirtual.Float(0, 1, .1f, SetDashVolumeWeight)
        //    .OnComplete(() => DOVirtual.Float(1, 0, .5f, SetDashVolumeWeight));
        DOVirtual.Float(0, 1, .1f, SetDashVolumeWeight)
            .OnComplete(() => DOVirtual.Float(1, 0, .5f, SetDashVolumeWeight));
    }
    public void Dash()
    {
        dashParticle.Play();

        Sequence dash = DOTween.Sequence().Insert(0, transform.DOMove(transform.position + (transform.forward * 5), .2f))
        .AppendCallback(() => dashParticle.Stop());
        DOVirtual.Float(0, 1, .1f, SetDashVolumeWeight)
            .OnComplete(() => DOVirtual.Float(1, 0, .5f, SetDashVolumeWeight));
    }
    void SetDashVolumeWeight(float weight)
    {
        dashVolume.weight = weight;
        switchT = !switchT;
        colorGradingLayer.enabled.value = switchT;
    }
}
