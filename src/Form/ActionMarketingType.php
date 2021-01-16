<?php

namespace App\Form;

use App\Entity\ActionMarketing;
use blackknight467\StarRatingBundle\Form\RatingType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ActionMarketingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nomAction')
            ->add('task')
            ->add('impact',RangeType::class,[

                'help' => 'L\' impact est entre 0 et 5',
                'attr' => [
                    'min' => 0,
                    'max' => 5,
                    'step' => 1,
                    'oninput' => 'action_marketing_value.value = action_marketing_impact.value'
                    ]

            ])
            ->add('value' ,TextType::class,[
                'mapped' => false,
                'attr' => [
                    'oninput' => 'action_marketing_impact.value = action_marketing_value.value',
                    'readonly' => true
                ]

            ])
            ->add('level', ChoiceType::class, [
                'choices'  => [
                    'Niveau 1' => 1,
                    'Niveau 2' => 2,







                ],
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ActionMarketing::class,
        ]);
    }
}
